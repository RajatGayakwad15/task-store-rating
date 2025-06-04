export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export function formatDate1(dateString) {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", { month: "long", day: "numeric" }) +
    ", " +
    date.getFullYear()
  );
}

export function getDateFromDateTime(registerTime) {
  const [datePart] = registerTime.split(" ");

  const [year, month, day] = datePart.split("-");
  return `${day}-${month}-${year}`;
}
