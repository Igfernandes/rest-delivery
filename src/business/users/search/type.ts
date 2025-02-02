import { UserProps } from "@database/dynamodb/entities/User/user/type";
import {
  AddressSearchProps,
  ContactSearchProps,
  UserSearchProps,
} from "@database/dynamodb/repositories/users/type";

export type UserSearchBusinessRequest = UserSearchProps & {
  contact: ContactSearchProps;
  address: AddressSearchProps;
};
export type UserSearchBusinessResponse =
  | {
      items: UserProps[];
      count: number;
    }
  | UserProps;
