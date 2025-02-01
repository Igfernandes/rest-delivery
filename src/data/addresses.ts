import { AddressProps } from "@database/dynamodb/entities/User/user/type";

export const addresses = {
  companyMarket: {
    country: "Brasil",
    state: "Rio de Janeiro",
    city: "Maricá",
    district: "Jardim Atlântico Central (Itaipuaçu)",
    complement: "Lote 20, Quadra 150",
    number: 1,
    zipCode: 24934555,
  },
  home: {
    country: "Brasil",
    state: "Rio de Janeiro",
    city: "Maricá",
    district: "Recanto III (Itaipuaçu)",
    complement: "Quadra 50, lote 16",
    number: 0,
    zipCode: 24900000,
  },
  university: {
    country: "Canadá",
    state: "Toronto",
    city: "Ontário",
    district: "Bathurst St",
    number: 399,
    complement: "ON M5T 2SB",
    zipCode: 0,
  },
} as Record<string, AddressProps>;
