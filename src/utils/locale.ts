export const localeDictionary = {
  id: "ID",
  name: "Nombre",
  phone: "Teléfono",
  joinedDate: "Fecha de añadido",
  nit: "NIT",
  address: "Dirección",
} as const;

export const codeToText = (code: keyof typeof localeDictionary): string => {
  return localeDictionary[code];
};
