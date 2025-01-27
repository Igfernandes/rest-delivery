import { messages } from "src/constants/messages";

/**
 *
 * @function generateKey
 * - O helper será responsável pela elaboração de chaves.
 *
 * @param prefix O valor que irá vir no início da key.
 * @param suffix O valor que irá vir no final da key.
 * @returns {string} A palavra contendo o valor de uma key gerada.
 */
export function generateKey(prefix?: string, suffix?: string): string {
  if (typeof prefix !== "string" || typeof suffix !== "string")
    throw messages.errors.values.onlyStrings;

  let keyPair = new Date().getTime().toString();

  if (prefix) keyPair = `${prefix}.${keyPair}`;
  if (suffix) keyPair += `.${suffix}`;

  return keyPair;
}
