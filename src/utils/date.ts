export const formatDate = (input: Date) => {
  const date = new Date(input);
  const day = date.getDay().toString().padStart(2, "0");
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${month + 1}-${year}`;
};
