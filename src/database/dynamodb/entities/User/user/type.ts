import { AddressProps } from "../address/type";
import { ContactProps } from "../contact/type";

export type UserProps = {
  objectId: string;
  name: string;
  birthdate: Date;
  status: UserStatus;
  addresses?: Record<string, AddressProps>;
  contacts?: Array<ContactProps>;
  createdAt: Date;
  updatedAt: Date;
};

export type UserStatus = "ACTIVE" | "INACTIVE";
