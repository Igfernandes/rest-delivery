import { statusCode } from "src/constants/statusCode";
import { ValidationError } from "yup";

export class ExceptionRequest {
  public getExceptionYup(error: unknown) {
    if (!(error instanceof ValidationError)) throw error;

    console.log(error)
    return {
      status: statusCode.BAD_REQUEST,
      messages: error.errors,
      body: error.value,
    };
  }
}
