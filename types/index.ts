export interface FormSubmissionData {
  uniqueId: string;
  name: string;
  phone: string;
  email: string;
  countryCode: string;
  age: string;
  gender: string;
  course: string;
  skill: string;
  country: string;
  date: string;
  time: string;
  consent: boolean;
  submissionTimestamp?: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  formLevel: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface GoogleServiceAccountCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
} 