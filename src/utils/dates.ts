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
