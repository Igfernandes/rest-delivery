import { addresses } from "@data/addresses";
import { contacts } from "@data/contacts";
import { describe, it, expect } from "@jest/globals";
import axios from "axios";
import { statusCode } from "src/constants/statusCode";

const { companyMarket } = addresses;

const USER_PAYLOAD = {
  name: "Admin Master",
  birthdate: "1998-10-20",
  status: "ACTIVE",
  addresses: [companyMarket],
  contacts: contacts,
};

const USER_ENDPOINT = "http://localhost:3000/api/users";

describe("Should Post User", () => {
  it("Should create an user", async () => {
    const response = await axios.post(USER_ENDPOINT, USER_PAYLOAD);

    expect(response.status).toBe(statusCode.OK);
    expect(!!response.data["userKey"]).toBeTruthy();
  });
});
