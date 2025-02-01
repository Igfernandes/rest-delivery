import { VALID_DATE } from "src/constants/regex";

/**
 * - (EN): The helper valid the birthdate.
 * - (pt-BR): O helper é responsável por validar uma data de nascimento
 *
 * @param {string} birthdate (EN) The birthdate with default value YYYY-mm-dd. / (pt-BR) A data de nascimento com o padrão yyyy-mm-dd.
 * @returns {boolean} (EN) if is birthdate valid and less that current date / (pt-BR) Se a data de nascimento é valida ou menor que a data atual.
 */
export function isValidBirthdate(birthdate: string = ""): boolean {
  if (!isValidDate(birthdate)) return false;

  const dateBirthdate = new Date(birthdate);
  const currentDate = new Date();

  return currentDate.getTime() > dateBirthdate.getTime();
}

/**
 * - (EN): The helper valid the date.
 * - (pt-BR): O helper é responsável por validar uma data
 *
 * @param {string} date (EN) The date with default value YYYY-mm-dd. / (pt-BR) A data com o padrão yyyy-mm-dd.
 * @returns {boolean} (EN) if is date valid  / (pt-BR) Se a date é valida
 */
export function isValidDate(date?: string | Date): boolean {
  if (date instanceof Date) return true;

  return !!date && VALID_DATE.test(date);
}
