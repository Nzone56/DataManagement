export interface Bill {
  id: string;
  billNumber: string;
  issueDate: number;
  expirationDate: number;
  clientId: string;
  nitcc: string;
  value: number;
  totalValue: number;
  concept: string;
  subject: string;
  status: string;
  city: string;
}

export interface RawBill {
  "Factura N°": string;
  "Fecha emisión": string;
  "Fecha vencimiento": string;
  "Razón Social": string;
  Nit: string;
  Valor: number;
  "Valor Total": string;
  Concepto: string;
  Asunto: string;
  Estado: string;
  Ciudad: string;
}
