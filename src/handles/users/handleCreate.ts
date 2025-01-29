import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import { statusCode } from "src/constants/statusCode";

export class UserCreate {
  public async handler(
    _event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<APIGatewayProxyStructuredResultV2> {
    

    return {
      statusCode: statusCode.OK,
      body: process.env.CUSTOM_VAR,
    };
  }
}
