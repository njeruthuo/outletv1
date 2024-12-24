export const formatDate = (arg: Date) => {
  const date = new Date(arg);
  const day = date.getDate().toString().padStart(2, "0"); // Corrected to getDate()
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month (0-indexed)
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
