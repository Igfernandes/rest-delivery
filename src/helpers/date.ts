export function getOnlyDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
