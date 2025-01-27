export function convertObjectValuesToArray(data: object | Array<unknown>) {
  return typeof data == "object" ? Object.values(data) : data;
}
