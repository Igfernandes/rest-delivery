import { statusCode } from "src/constants/statusCode";
import { ValidationError } from "yup";

export class ExceptionRequest {
  public getExceptionYup(error: unknown) {
    if (!(error instanceof ValidationError)) throw error;

    return {
      statusCode: statusCode.BAD_REQUEST,
      body: JSON.stringify({
        errors: error.errors
      }),
    };
  }
}
