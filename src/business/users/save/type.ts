import {
  AddressProps,
  ContactProps,
  UserStatus,
} from "@database/dynamodb/entities/User/user/type";

export type UserSaveBusinessResponse = {
  userKey: string | number;
};

export type UserSaveBusinessRequest = {
  objectId?: string;
  name: string;
  birthdate: Date;
  status: UserStatus;
  addresses?: Array<AddressProps>;
  contacts?: Array<ContactProps>;
};
