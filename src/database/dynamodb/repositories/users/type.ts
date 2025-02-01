import { UserStatus } from "@database/dynamodb/entities/User/user/type";
import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";

export type UserSearchReturn = {
  count: number;
  items: UserEntity[];
};

export type AddressSearchProps = {
  country?: string;
  state?: string;
  city?: string;
  district?: string;
  complement?: string;
  number?: number;
  zipCode?: number;
};
export type ContactSearchProps = {
  label?: string;
  value?: string;
  isMain?: boolean;
};

export type UserSearchProps = {
  objectId?: string;
  name?: string;
  name_contains?: string;
  birthdate?: Date;
  status?: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserPrimeKeyProps = {
  objectId: string;
  name: string;
};

export type UserDeleteProps = UserPrimeKeyProps;
export type UserUpdateProps = UserPrimeKeyProps;
