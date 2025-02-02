import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import { statusCode } from "src/constants/statusCode";
import { userSchema } from "./dto";
import { UserSaveBusiness } from "src/business/users/save";
import { ExceptionRequest } from "@helpers/ExceptionRequest";

export const handled = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const userSaveBusiness = new UserSaveBusiness();
    const payload = await userSchema.validate(JSON.parse(_event.body ?? ""));

    const response = await userSaveBusiness.execute({
      ...payload,
      birthdate: new Date(payload.birthdate),
      status: "ACTIVE",
    });

    return {
      statusCode: statusCode.OK,
      body: JSON.stringify(response),
    };
  } catch (err: unknown) {
    const exceptionRequest = new ExceptionRequest();

    return  exceptionRequest.getExceptionYup(err);
  }
};
