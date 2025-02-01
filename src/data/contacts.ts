import { ContactProps } from "@database/dynamodb/entities/User/user/type";

export const contacts = [
  {
    label: "email",
    value: "companymarketbr@gmail.com",
    isMain: false,
  },
  {
    label: "cellphone",
    value: "+55 (21) 9 8240-5342",
    isMain: true,
  },
  {
    label: "email",
    value: "fernandes2.3@outlook.com",
    isMain: true,
  },
  {
    label: "cellphone",
    value: "+55 (21) 9 9903-3797",
    isMain: false,
  },
] as ContactProps[];
