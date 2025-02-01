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

/**
 * @function removeEmptyObjects
 * - (EN): The helper remove of struct in object anywhere proprieties empty.
 * - (pt-BR): O Helper remove de um objeto todas as propriedades com valores vazios.
 *
 * @param {object} data O objeto que será manipulado.
 * @returns {object} O objeto filtrado.
 */
export function removeEmptyObjects(data: object): Object | null {
  if (typeof data == "object" && Array.isArray(data))
    throw messages.errors.values.typeInvalid("objeto");

  const matrizFiltered = Object.entries(data).filter(
    ([KeyObject, valueObject]) => {
      if (!!valueObject && typeof valueObject != "object") return true;

      return removeEmptyObjects(valueObject);
    }
  );

  const objectResponse = Object.fromEntries(matrizFiltered);

  if (Object.entries(objectResponse).length == 0) return null;

  return objectResponse;
}
