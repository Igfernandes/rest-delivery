import { messages } from "src/constants/messages";

/**
 * @function convertObjectValuesToArray
 * - (EN): The helper verify if value is an object or array valid and return values if to by object or only
 * return if be array
 * - (pt-BR): O auxiliar verifica se o valor é um objeto ou array válido e retorna valores se for objeto ou apenas
 * retorna o valor repassado caso seja array.
 *
 * @param {object|Array<unknown>} data
 * @returns {Array<unknown>}
 */
export function convertObjectValuesToArray(
  data: object | Array<unknown>
): Array<unknown> {
  if (typeof data == "object") return Object.values(data);

  if (!Array.isArray(data)) throw messages.errors.values.invalid;

  return data;
}
