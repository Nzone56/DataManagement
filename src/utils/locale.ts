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
} as const;

export const codeToText = (code: keyof typeof localeDictionary): string => {
  return localeDictionary[code];
};
