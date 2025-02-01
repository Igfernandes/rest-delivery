import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import { statusCode } from "src/constants/statusCode";
import { userSchema } from "./dto";
import { UserSearchBusiness } from "src/business/users/search/UserSearchBusiness";
import { removeEmptyObjects } from "@helpers/object";
import { ExceptionRequest } from "@helpers/ExceptionRequest";

export const handled = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const userSearchBusiness = new UserSearchBusiness();

    const payload = await userSchema.validate(
      _event.queryStringParameters ?? {}
    );

    const response = await userSearchBusiness.execute({
      ...(removeEmptyObjects(payload) ?? {}),
      objectId: _event["pathParameters"]?.id as string,
    });

    return {
      statusCode: statusCode.OK,
      body: JSON.stringify(response),
    };
  } catch (err) {
    const exceptionRequest = new ExceptionRequest();

    throw exceptionRequest.getExceptionYup(err);
  }
};
