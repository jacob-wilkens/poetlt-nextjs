export function getTodayDateString(offSet?: number): string {
  const today = new Date();

  if (offSet) {
    const offsetInMinutes = offSet * 60;
    const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
    const offsetDate = new Date(today.getTime() + offsetInMilliseconds);
    today.setTime(offsetDate.getTime());
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(today);
}

export function getCurrentUTCOffset(): string {
  const date = new Date();

  const offsetInMinutes = date.getTimezoneOffset();
  const offset = -1 * Math.floor(offsetInMinutes / 60);

  return `${offset}`;
}
