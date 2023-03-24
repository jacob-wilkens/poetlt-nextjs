//function to get date string of current date in MM/DD/YYYY format
export function getTodayDateString(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(today);
}
