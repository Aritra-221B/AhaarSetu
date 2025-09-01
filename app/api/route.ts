import { NextResponse } from 'next/server';
import { appendFormData, sendConfirmationEmailToUser } from '../../lib/sheetsService';
import { FormSubmissionData } from '../../types';

export async function POST(request: Request) {
  try {
    const data: FormSubmissionData = await request.json();

    const fullPayload: FormSubmissionData = {
      ...data,
      submissionTimestamp: new Date().toISOString(),
      status: data.status || "Pending",
      formLevel: data.formLevel, // Use the provided formLevel
    };


    const result = await appendFormData(fullPayload);

    if (result.success) {
      if (fullPayload.formLevel === "SchedulePreferences") {
        await sendConfirmationEmailToUser(fullPayload);
      }
      return NextResponse.json({ success: true, message: result.message });
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('API Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
} 