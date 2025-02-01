import { UserStatus } from "@database/dynamodb/entities/User/user/type";

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
  objectId: string;
  name?: string;
  birthdate?: Date;
  status?: UserStatus;
  addresses?: Record<string, AddressSearchProps>;
  contacts?: Array<ContactSearchProps>;
  createdAt?: Date;
  updatedAt?: Date;
};


