export interface Worklog {
  id: string;
  lawyerId: string;
  clientId: string;
  caseNumber?: string;
  sector?: string;
  topic: string;
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

export interface RawWorklog {
  ID: string;
  Usuario: string;
  Cliente: string;
  Asunto: string;
  Area: string;
  "Modo de Facturación": string;
  "Responsable Facturación": string;
  "Tiempo Reportado (Minutos)": number;
  "Tiempo Trabajado (Minutos)": number;
  "Fecha Trabajo": string;
  Concepto: string;
  "Tarifa Horaria": number;
  Moneda: string;
  Total: number;
  Facturado: string;
  Estado: string;
  Facturable: string;
  "N° Documento": string;
  Fecha_Ultima_Modificacion: string;
  "Fecha Creación": string;
  Origen: string;
}
