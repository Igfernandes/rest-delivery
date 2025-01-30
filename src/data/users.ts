import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { generateKey } from "@helpers/generateKey";
import { addresses } from "./addresses";
import { contacts } from "./contacts";
import { ContactEntity } from "@database/dynamodb/entities/User/contact";
import { AddressEntity } from "@database/dynamodb/entities/User/address";

const { companyMarket, home, university } = addresses;

export const users = [
  {
    objectId: generateKey("adm", "master"),
    name: "Admin Master",
    birthdate: new Date("1998-10-20"),
    status: "ACTIVE",
    addresses: { 
      companyMarket: new AddressEntity(companyMarket).getAttributes(),
    },
    contacts: contacts
      .slice(0, 1)
      .map((contact) => new ContactEntity(contact).getAttributes()),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    objectId: generateKey("adm", "test"),
    name: "Admin Test",
    birthdate: new Date("1995-12-20"),
    status: "ACTIVE",
    addresses: {
      home: new AddressEntity(home).getAttributes(),
    },
    contacts: contacts
      .slice(2, 3)
      .map((contact) => new ContactEntity(contact).getAttributes()),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    objectId: generateKey("only", "read"),
    name: "Only Desative User",
    birthdate: new Date("2002-05-05"),
    status: "INACTIVE",
    addresses: {
      university: new AddressEntity(university).getAttributes(),
    },
    contacts: contacts
      .slice(2, 3)
      .map((contact) => new ContactEntity(contact).getAttributes()),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as UserProps[];
