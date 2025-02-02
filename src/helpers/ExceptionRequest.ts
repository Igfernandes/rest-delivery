import { statusCode } from "src/constants/statusCode";
import { ValidationError } from "yup";

type ExceptionYupResponse = {
  statusCode: number;
  body: string;
};

export class ExceptionRequest {
  /**
   *
   * @method getExceptionYup
   * - (EN): The method will handle specific errors returned by the "yup" module
   * - (pt-BR): O método irá tratar erros específicos retornados pelo modulo "yup"
   *
   * @param error (EN): the error captured by the "catch" block / (pt-BR): O erro capturado pelo bloco do "catch".
   * @returns {ExceptionYupResponse} (EN): the object with error modified / (pt-BR): O objeto com o erro modificado.
   */
  public getExceptionYup(
    error: ValidationError | unknown
  ): ExceptionYupResponse {
    if (!(error instanceof ValidationError)) throw error;

    return {
      statusCode: statusCode.BAD_REQUEST,
      body: JSON.stringify({
        errors: error.errors,
      }),
    };
  }
}
