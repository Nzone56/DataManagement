export const localeDictionary = {
  id: "ID",
  name: "Nombre",
  firstName: "Nombre",
  lastName: "Apellido",
  phone: "Teléfono",
  cc: "CC",
  email: "Correo",
  joinedDate: "Fecha de añadido",
  nit: "NIT",
  address: "Dirección",
  type: "Tipo",
  conceptId: "Concepto",
  amount: "Cantidad",
  date: "Fecha",
  description: "Descripción",
  color: "Color",
  nitcc: "NIT / CC",
  city: "Ciudad",
  repLegal: "Representante Legal",
  position: "Cargo",
  entryDate: "Fecha de Ingreso",
  subConcepts: "Sub-Categorias",
  feeConcept: "Concepto",
  topic: "Asunto",
  area: "Area",
  billingMode: "Modo de Facturación",
  billingResponsible: "Responsable Facturación",
  reportedTime: "Tiempo Reportado",
  workedTime: "Tiempo Trabajado",
  dateWork: "Fecha Trabajo",
  concept: "Concepto",
  hourlyRate: "Tarifa Horaria",
  currency: "Moneda",
  total: "Total",
  billed: "Facturado",
  status: "Estado",
  billable: "Facturable",
  documentNumber: "N° Documento",
  lastModifiedDate: "Fecha Ult Modificación",
  creationDate: "Fecha Creación",
  source: "Origen",
  lawyerId: "Abogado",
  clientId: "Cliente",
} as const;

export const codeToText = (code: keyof typeof localeDictionary): string => {
  return localeDictionary[code];
};
