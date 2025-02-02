import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import { statusCode } from "src/constants/statusCode";
import { userSchema } from "./dto";
import { UserSearchBusiness } from "src/business/users/search";
import { removeEmptyValuesInObjects } from "@helpers/object";
import { ExceptionRequest } from "@helpers/ExceptionRequest";
import {
  AddressProps,
  ContactProps,
} from "@database/dynamodb/entities/User/user/type";

export const handled = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const userSearchBusiness = new UserSearchBusiness();

    const {
      country,
      state,
      city,
      district,
      zipCode,
      value,
      label,
      isMain,
      ...payload
    } = await userSchema.validate(_event.queryStringParameters ?? {});

    const response = await userSearchBusiness.execute({
      ...(removeEmptyValuesInObjects(payload) ?? {}),
      objectId: _event["pathParameters"]?.objectId as string,
      address: removeEmptyValuesInObjects({
        country,
        state,
        city,
        district,
        zipCode,
      }) as AddressProps,
      contact: removeEmptyValuesInObjects({
        value,
        label,
        isMain,
      }) as ContactProps,
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
