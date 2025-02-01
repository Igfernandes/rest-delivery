export type AddressProps = {
  country: string;
  state: string;
  city: string;
  district: string;
  complement?: string;
  number?: number;
  zipCode: number;
};
export type ContactProps = {
  label: string;
  value: string;
  isMain?: boolean;
};

export type UserProps = {
  objectId?: string;
  name: string;
  birthdate: Date;
  status: UserStatus;
  addresses?: Array<AddressProps>;
  contacts?: Array<ContactProps>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserStatus = "ACTIVE" | "INACTIVE";
