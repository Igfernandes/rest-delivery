export type setQueriesProps = {
  url: string;
  query?: object;
};

/**
 * @method getQueries
 * - Responsável por converter um objeto em queries e adicionar a url fornecida.
 *
 * @param {string} url* A url que deseja alimentar com as queries
 * @param {object} query* O objeto representando as queries que deseja criar, sendo a construção baseada
 * nas mesmas relações de chave e valor.
 *
 * @returns {string} url A url retornada com as queries.
 */

export function getQueries({ url, query }: setQueriesProps): string {
  if (query) {
    url += "?";

    Object.entries(query).forEach(([label, value]) => {
      if (typeof value != "undefined" || value != null)
        url += `${label}=${value}&`;
    });
  }

  return url.slice(0, -1);
}
