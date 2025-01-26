export type UserProps = {
  objectId: string;
  name: string;
  birthdate: Date;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type UserStatus = "ACTIVE" | "INACTIVE";
