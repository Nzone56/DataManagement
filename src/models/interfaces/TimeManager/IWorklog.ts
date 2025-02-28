export interface Worklog {
  id: string;
  lawyerId: string;
  clientId: string;
  caseNumber?: string;
  sector?: string;
  subject: string;
  area: string;
  practiceArea?: string;
  billingMode: string;
  billingResponsible: string;
  reportedTime: number; //Minutes
  workedTime: number; //Minutes
  dateWork: number;
  concept: string;
  hourlyRate: number;
  currency: string;
  total: number;
  billed: boolean;
  status: string;
  billable: boolean;
  documentNumber: string;
  lastModifiedDate: number;
  creationDate: number;
  source: string;
}
