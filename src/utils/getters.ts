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

export const getComplementaryColor = (rgbColor: string): string => {
  const match = rgbColor.match(/\d+/g);
  if (!match || match.length < 3) return "#000";

  const [r, g, b] = match.map(Number);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 128 ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
};
