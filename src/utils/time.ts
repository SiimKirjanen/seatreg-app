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
