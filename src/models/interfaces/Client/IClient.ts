export interface Client {
  id: string;
  name: string;
  repLegal: string;
  phone: string;
  nitcc: string;
  address: string;
  city: string;
  email: string;
  joinedDate?: number;
}

export interface RawClient {
  "Razón Social": string;
  Representante: string;
  Dirección: string;
  Ciudad: string;
  NIT: string;
  Teléfono: string;
  "e-mail": string;
}
