export function getDatesBetweenDates(startDate, endDate) {
  const offset = new Date().getTimezoneOffset();

  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(
      new Date(currentDate.getTime() - offset * 60 * 1000)
        .toISOString()
        .split("T")[0]
    );
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
