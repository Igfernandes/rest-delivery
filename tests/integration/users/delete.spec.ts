import { users } from "@data/users";
import { describe, it, expect } from "@jest/globals";
import axios from "axios";
import { statusCode } from "src/constants/statusCode";

const USER_ENDPOINT = `http://localhost:3000/api/users/${users[2].objectId}`;

describe("Should DELETE User", () => {
  it("Should delete an user", async () => {
    const response = await axios.delete(USER_ENDPOINT);

    expect(response.status).toBe(statusCode.OK);
    expect(response.data.success).toBeTruthy();
  });
});
