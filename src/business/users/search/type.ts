import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { UserSearchProps } from "@database/dynamodb/repositories/users/type";

export type UserSearchBusinessRequest = UserSearchProps;
export type UserSearchBusinessResponse = UserProps[] | UserProps;
