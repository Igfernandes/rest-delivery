import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import { statusCode } from "src/constants/statusCode";
import { userSchema } from "./dto";
import { ExceptionRequest } from "@helpers/ExceptionRequest";
import { UserUpdateBusiness } from "src/business/users/update";

export const handled = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const userUpdateBusiness = new UserUpdateBusiness();
    const payload = await userSchema.validate({
      ...JSON.parse(_event.body ?? ""),
      objectId: _event["pathParameters"]?.objectId,
    });

    const response = await userUpdateBusiness.execute({
      ...payload,
      birthdate: new Date(payload.birthdate),
    });

    return {
      statusCode: statusCode.OK,
      body: JSON.stringify(response),
    };
  } catch (err: unknown) {
    const exceptionRequest = new ExceptionRequest();

    return exceptionRequest.getExceptionYup(err);
  }
};
