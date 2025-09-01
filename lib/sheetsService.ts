import { google, Auth } from 'googleapis';
import type { FormSubmissionData, GoogleServiceAccountCredentials } from '../types';
import nodemailer from 'nodemailer';

const sheets = google.sheets('v4');

const SPREADSHEET_ID = '1iiZa8ORaZEKAbiDplLcCYYzV2elES7E5XOhJiECvgT0'; // <<< IMPORTANT: Replace with your actual Google Sheet ID

async function getAuthClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY environment variable is not set.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey.replace(/\\n/g, '\n'), // Re-add replace for escaped newlines
    } as GoogleServiceAccountCredentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  if (!client) {
    throw new Error('Failed to get GoogleAuth client.');
  }
  return client as Auth.OAuth2Client;
}

async function findRowByUniqueId(authClient: Auth.OAuth2Client, uniqueId: string): Promise<{ rowNumber: number, rowData: string[] } | null> {
  try {
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:O', // Read all columns to get existing data
    });

    const rows = response.data.values;
    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === uniqueId) {
          return { rowNumber: i + 1, rowData: rows[i] as string[] }; // Return 1-indexed row number and data
        }
      }
    }
    return null; // Not found
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error finding row by uniqueId:', error.message);
    }
    return null;
  }
}

async function sendEmail(data: FormSubmissionData) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER, // Your Hostinger email address
      pass: process.env.EMAIL_PASS, // Your Hostinger email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address - must be your Hostinger email
    to: 'info@chordscraftinstituteofmusic.com', // Recipient address
    subject: `New Trial Class Booking: ${data.name}`,
    html: `
      <h1>New Trial Class Booking Submission</h1>
      <p>A new form has been submitted.</p>
      <h2>Details:</h2>
      <ul>
        <li><strong>Unique ID:</strong> ${data.uniqueId}</li>
        <li><strong>Name:</strong> ${data.name || 'N/A'}</li>
        <li><strong>Email:</strong> ${data.email || 'N/A'}</li>
        <li><strong>Phone:</strong> ${data.countryCode || ''}${data.phone || 'N/A'}</li>
        <li><strong>Submission Timestamp:</strong> ${data.submissionTimestamp || 'N/A'}</li>
        <li><strong>Status:</strong> ${data.status || 'N/A'}</li>
      </ul>
      <p>Please check the Google Sheet for full details and to update the status. Access it here: <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit">Google Sheet Link</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email alert sent successfully!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email alert:', error.message); // Existing error log, but ensures it's caught
      console.error('Full email sending error details:', error); // New detailed error log
    }
  }
}

export async function sendConfirmationEmailToUser(data: FormSubmissionData) {
  if (!data.email) {
    console.error('User email not provided, cannot send confirmation email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER, // Your Hostinger email address
      pass: process.env.EMAIL_PASS, // Your Hostinger email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address - must be your Hostinger email
    to: data.email, // Recipient is the user's email
    subject: `Chordscraft Institute Of Music: Your Trial Class Booking is Confirmed!`, // User-friendly subject
    html: `
      <h1>Hello ${data.name || 'there'}!</h1>
      <p>Dear ${data.name || "Musician"},</p>
      <p>Thank you for booking a trial class with Chordscraft Institute Of Music!</p>
      <p>Your booking details are as follows:</p>
      <ul>
        <li><strong>Course:</strong> ${data.course || 'N/A'}</li>
        <li><strong>Skill Level:</strong> ${data.skill || 'N/A'}</li>
        <li><strong>Preferred Date:</strong> ${data.date || 'N/A'}</li>
        <li><strong>Preferred Time:</strong> ${data.time || 'N/A'}</li>
        <li><strong>Your Unique Booking ID:</strong> ${data.uniqueId}</li>
      </ul>
      <p>⚠️ We will contact you shortly to confirm the exact time and instructor availability. Please keep an eye on your inbox and phone for updates.</p>
      <p>In the meantime, feel free to explore more about Chordscraft Institute Of Music on our website: <a href="https://www.chordscraftinstituteofmusic.com">www.chordscraftinstituteofmusic.com</a></p>
      <p>Best regards,</p>
      <b>Team Chordscraft Institute Of Music.</p>
      <p><strong>With ❤️ From CIM!</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to user: ${data.email} successfully!`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error sending confirmation email to user ${data.email}:`, error.message);
      console.error('Full confirmation email sending error details:', error);
    }
  }
}

export async function appendFormData(data: FormSubmissionData) {
  try {
    const authClient = await getAuthClient();

    // Define column order for the spreadsheet
    const columnOrder = [
      'uniqueId', 'name', 'email', 'phone', 'age', 'gender', 'course', 
      'skill', 'country', 'date', 'time', 'consent', 'formLevel', 
      'submissionTimestamp', 'status'
    ];

    let mergedRow: (string | boolean)[] = new Array(columnOrder.length).fill('');
    let existingRowData: string[] = [];

    const existingRowInfo = await findRowByUniqueId(authClient, data.uniqueId);

    if (existingRowInfo) {
      existingRowData = existingRowInfo.rowData;
      // Map existing data to mergedRow based on columnOrder
      for (let i = 0; i < columnOrder.length; i++) {
        if (existingRowData[i] !== undefined && existingRowData[i] !== null) {
          mergedRow[i] = existingRowData[i];
        }
      }
    }

    // Merge new data into mergedRow, prioritizing new data
    for (const key of columnOrder) {
      if (key === 'phone') {
        // Special handling for phone to combine countryCode and phone
        if (data.countryCode !== undefined && data.phone !== undefined) {
          mergedRow[columnOrder.indexOf('phone')] = `${data.countryCode}${data.phone}`;
        } else if (data.phone !== undefined) { // If only phone is provided, use it
          mergedRow[columnOrder.indexOf('phone')] = data.phone;
        }
      } else if (key === 'consent') {
          // Explicitly handle consent as boolean to 'Yes'/'No' string
          mergedRow[columnOrder.indexOf(key)] = data.consent ? 'Yes' : 'No';
      } else if (key === 'status') {
          // Status always gets a value; prioritize data.status, then existing, then 'Pending'
          const statusValue = data.status || (existingRowInfo ? existingRowData[columnOrder.indexOf(key)] : 'Pending');
          mergedRow[columnOrder.indexOf(key)] = statusValue;
      } else if (key === 'submissionTimestamp') {
          // Submission timestamp; prioritize data, then existing, then new timestamp
          const timestampValue = data.submissionTimestamp || (existingRowInfo ? existingRowData[columnOrder.indexOf(key)] : new Date().toISOString());
          mergedRow[columnOrder.indexOf(key)] = timestampValue;
      } else {
          // For all other keys, if present in data and not null/undefined, use it.
          // Otherwise, retain existing value or empty string.
          const dataValue = data[key as keyof FormSubmissionData];
          if (key in data && dataValue !== undefined && dataValue !== null) {
              mergedRow[columnOrder.indexOf(key)] = dataValue;
          }
      }
    }

    // Ensure formLevel is always the latest provided
    mergedRow[columnOrder.indexOf('formLevel')] = data.formLevel;

    if (existingRowInfo) {
      // Update existing row
      await sheets.spreadsheets.values.update({
        auth: authClient,
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A${existingRowInfo.rowNumber}:O${existingRowInfo.rowNumber}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [mergedRow],
        },
      });
      console.log(`Data updated successfully for uniqueId: ${data.uniqueId}`);
      return { success: true, message: 'Data updated successfully' };
    } else {
      // Append new row
      await sheets.spreadsheets.values.append({
        auth: authClient,
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:O',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [mergedRow],
        },
      });
      console.log('New data appended successfully');
      if (data.formLevel === "BasicDetails") {
        await sendEmail(data);
      }
      return { success: true, message: 'New data appended successfully' };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error processing data for Google Sheet:', error.message);
      return { success: false, message: `Failed to process data: ${error.message}` };
    }
    return { success: false, message: 'Failed to process data: An unknown error occurred' };
  }
} 