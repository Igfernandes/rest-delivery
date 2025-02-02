import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { UserSearchProps } from "@database/dynamodb/repositories/users/type";

export type UserUpdateBusinessResponse = {
  success: boolean;
};

export type UserUpdateBusinessRequest = UserSearchProps & {
  objectId: string | number;
};
