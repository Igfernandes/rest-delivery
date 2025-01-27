/**
 *
 * @function generateKeys
 * - O helper será responsável pela elaboração de chaves.
 *
 * @param prefix O valor que irá vir no início da key.
 * @param suffix O valor que irá vir no final da key.
 * @returns {string} A palavra contendo o valor de uma key gerada.
 */
export function generateKeys(prefix?: string, suffix?: string): string {
  const date = new Date();

  return `${prefix}.${date.getTime()}.${suffix}`;
}
