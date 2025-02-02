import { users } from "@data/users";
import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { describe, it, expect } from "@jest/globals";
import axios from "axios";
import { statusCode } from "src/constants/statusCode";

const USER_ENDPOINT = "http://localhost:3000/api/users";

describe("Should Get current User", () => {
  it("Should get list of users", async () => {
    const response = await axios.get(USER_ENDPOINT);

    expect(response.status).toBe(statusCode.OK);
    expect(Array.isArray(response.data.items)).toBeTruthy();
  });

  it("Should get only of users", async () => {
    const response = await axios.get(`${USER_ENDPOINT}/${users[0].objectId}`);
    const { createdAt, updatedAt, ...foundUser } = response.data as UserProps;
    const {
      birthdate,
      createdAt: createdAtReference,
      updatedAt: updatedAtReference,
      ...userReference
    } = users[0];

    expect(response.status).toBe(statusCode.OK);
    expect(foundUser).toEqual({
      ...userReference,
      birthdate: birthdate.toISOString(),
    });
  });

  it("Should get users by queryParam", async () => {
    const response = await axios.get(USER_ENDPOINT, {
      params: {
        country: "Brasil",
      },
    });

    expect(response.status).toBe(statusCode.OK);
    expect(response.data.items.length).toBeGreaterThan(0);
  });
});
