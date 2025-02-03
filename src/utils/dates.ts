export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  // Format: "DD/MM/YYYY"
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};

export const convertToTimestamp = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getTime();
};

export const convertToDateString = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toISOString();
};

export const convertToDate = (timestamp: number): Date => {
  const date = new Date(timestamp);
  return date;
};
