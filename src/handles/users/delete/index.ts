import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import { statusCode } from "src/constants/statusCode";
import { userSchema } from "./dto";
import { ExceptionRequest } from "@helpers/ExceptionRequest";
import { UserDeleteBusiness } from "src/business/users/delete";

export const handled = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const userDeleteBusiness = new UserDeleteBusiness();
    const payload = await userSchema.validate({
      objectId: _event["pathParameters"]?.objectId,
    });

    const response = await userDeleteBusiness.execute(payload);

    return {
      statusCode: statusCode.OK,
      body: JSON.stringify(response),
    };
  } catch (err: unknown) {
    const exceptionRequest = new ExceptionRequest();

    return exceptionRequest.getExceptionYup(err);
  }
};
