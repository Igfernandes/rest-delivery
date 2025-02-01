import { users } from "@data/users";
import { describe, it, expect } from "@jest/globals";
import { request } from "http";
import { messages } from "src/constants/messages";
import { statusCode } from "src/constants/statusCode";

const USER_ENDPOINT = "http://localhost:3000/api/users";
const CONFIG_REQUEST = {
  origin: "http://localhost",
  port: 3000,
  pathname: "/api/users",
};

describe("Should Get current User", () => {
  describe("Success tests", () => {
    it("Should get list of users", async () => {
      request(USER_ENDPOINT, (response) => {
        expect(response.statusCode).toBe(statusCode.OK);
        response.on("readable", () => {
          expect(Array.isArray(response.read())).toBeTruthy();
        });
      });
    });

    it("Should get only of users", async () => {
      request(
        {
          ...CONFIG_REQUEST,
          pathname: `/api/users/${users[0].objectId}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.OK);
          response.on("readable", () => {
            expect(response.read()).toEqual(users[0]);
          });
        }
      );
    });

    it("Should get users by queryParam", async () => {
      request(
        {
          ...CONFIG_REQUEST,
          pathname: `/api/users/`,
          search: "country=Brasil",
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.OK);
          response.on("readable", () => {
            expect(response.read().length).toBeGreaterThan(0);
          });
        }
      );
    });
  });

  describe("Failed tests", () => {
    const messageErrorLessLength = (field: string, length: number) =>
      `Should return error message of param '${field}' is less than '${length}'`;
    const messageErrorGreaterLength = (field: string, length: number) =>
      `Should return error message of param '${field}' is less than '${length}'`;
    const messageErrorDateFormatInvalid =
      "Should return error message of param 'birthdate' isn't date format 'YYYY/MM/DD' invalid";
    const messageErrorOptionInvalid = (field: string) =>
      `Should return error message of param '${field}' isn't option valid`;

    it(messageErrorLessLength("name", 5), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: "name=NaN",
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.min("name", 5)
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("name", 100), async () => {
      const stringWithHundredElevenLength = "onlyTest201".repeat(10);
      request(
        {
          ...CONFIG_REQUEST,
          search: `name=${stringWithHundredElevenLength}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("name", 5)
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("name_contains", 100), async () => {
      const stringWithHundredElevenLength = "onlyTest201".repeat(10);
      request(
        {
          ...CONFIG_REQUEST,
          search: `name_contains=${stringWithHundredElevenLength}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("name_contains", 5)
            );
          });
        }
      );
    });

    it(messageErrorDateFormatInvalid, async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `birthdate=20/20/20`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              `O birthdate ${messages.errors.values.invalid.toLocaleLowerCase()}`
            );
          });
        }
      );
    });

    it(messageErrorOptionInvalid("status"), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `status=NoOption`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              `O status ${messages.errors.values.optionInvalid("status")}`
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("country", 50), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `country=${"NoCountry".repeat(52)}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("country", 50)
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("state", 50), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `state=${"NoState".repeat(52)}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("state", 50)
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("city", 100), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `city=${"NoCity".repeat(52)}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("city", 100)
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("district", 100), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `district=${"NoDistrict".repeat(52)}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("district", 50)
            );
          });
        }
      );
    });

    it(messageErrorGreaterLength("zipCode", 10), async () => {
      request(
        {
          ...CONFIG_REQUEST,
          search: `zipCode=${"NoZipCode".repeat(52)}`,
        },
        (response) => {
          expect(response.statusCode).toBe(statusCode.BAD_REQUEST);
          response.on("readable", () => {
            expect(response.read().errors).toContain(
              messages.errors.values.max("zipCode", 8)
            );
          });
        }
      );
    });
  });
});
