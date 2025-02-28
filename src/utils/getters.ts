export const getPropById = <T extends { id: string; color: string }>(id: string, array: T[], prop: keyof T): string => {
  const item = array?.find((item) => item.id === id);
  return String(item?.[prop] ?? "");
};

export const getOptionsType = (name: string) => {
  const match = name.match(/^(.*?)(Id)$/i);
  if (!match) {
    return [];
  }

  return match[1];
};

export const getComplementaryColor = (hexColor: string): string => {
  let hex = hexColor.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) return "#000";

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calcular la luminosidad
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Determinar el color del texto basado en la luminosidad
  return luminance > 150 ? "#000000" : "#FFFFFF"; // Negro si el fondo es claro, blanco si es oscuro
};

export const getSimpleOptions = (type: string) => {
  const optionsDictionary: Record<string, string[]> = {
    feeConcept: ["Germán Ulloa", "Carlos Bermudez"],
  };

  return optionsDictionary[type] || [];
};
