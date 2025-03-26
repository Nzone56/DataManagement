export interface Receipt {
  id: string;
  receiptNumber: string;
  date: number;
  clientId: string;
  registered: string;
  paymentMethod: string;
  totalValue: number;
  bills: string;
  observations: string;
}

export interface RawReceipt {
  "N° Recibo": string;
  Fecha: string;
  Cliente: string;
  "Registrado por": string;
  "Forma de pago": string;
  Total: number;
  Facturas: string;
  Observaciones: string;
}
