export function getDayWithSuffix(day: number) {
  let suffix;

  if (day >= 11 && day <= 13) {
    suffix = 'th';
  } else {
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
  }
  return `${day}${suffix}`;
}

export function getDateString(unixTimeStamp) {
  const date = new Date(unixTimeStamp * 1000);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const formattedDate = `${getDayWithSuffix(day)} ${month} ${year}`;

  return formattedDate;
}

export function getDateStringForBE(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
