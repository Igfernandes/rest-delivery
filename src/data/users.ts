import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { generateKey } from "@helpers/generateKey";
import { addresses } from "./addresses";
import { contacts } from "./contacts";

const { companyMarket, home, university } = addresses;

export const users = [
  {
    objectId: generateKey("adm", "master"),
    name: "Admin Master",
    birthdate: new Date("1998-10-20"),
    status: "ACTIVE",
    addresses: [companyMarket],
    contacts: contacts,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    objectId: generateKey("adm", "test"),
    name: "Admin Test",
    birthdate: new Date("1995-12-20"),
    status: "ACTIVE",
    addresses: [home],
    contacts: contacts,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    objectId: generateKey("only", "read"),
    name: "Only Desative User",
    birthdate: new Date("2002-05-05"),
    status: "INACTIVE",
    addresses: [university],
    contacts,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as UserProps[];
