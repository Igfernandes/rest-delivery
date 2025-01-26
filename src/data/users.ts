import { UserProps } from "@database/dynamodb/entities/User/type";

export const users = [
  {
    objectId: "abc123",
    name: "Admin Master",
    birthdate: new Date("1998-10-20"),
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    objectId: "abc124",
    name: "Admin Test",
    birthdate: new Date("1995-12-20"),
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    objectId: "abc125",
    name: "Only Desative User",
    birthdate: new Date("2002-05-05"),
    status: "INACTIVE",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as UserProps[];
