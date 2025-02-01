import { addresses } from "@data/addresses";
import { contacts } from "@data/contacts";
import { users } from "@data/users";
import { describe, it, expect } from "@jest/globals";
import { request } from "http";
import { RequestOptions } from "https";
import { messages } from "src/constants/messages";
import { statusCode } from "src/constants/statusCode";

const { companyMarket } = addresses;

const USER_PAYLOAD = {
  objectId: "adm_.1738377174545.master",
  name: "Admin Master",
  birthdate: new Date("1998-10-20"),
  status: "ACTIVE",
  addresses: [companyMarket],
  contacts: contacts,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const headerDeclarations = {
  "Content-Type": "application/json",
  "Content-Length": Buffer.byteLength(JSON.stringify(USER_PAYLOAD)),
};

const CONFIG_REQUEST = {
  origin: "http://localhost",
  method: "POST",
  port: 3000,
  pathname: "/api/users",
  headers: headerDeclarations,
} as RequestOptions;

function preparePayloadPost(payload: object) {
  return {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(JSON.stringify(payload)),
  };
}

describe("Should Post User", () => {
  describe("Success tests", () => {
    it("Should create an user", async () => {
      request(CONFIG_REQUEST, (response) => {
        expect(response.statusCode).toBe(statusCode.OK);
        response.on("readable", () => {
          const payload = response.read();
          expect(!!payload["userKey"]).toBeTruthy();
        });
      });
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            name: "NaN",
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            name: stringWithHundredElevenLength,
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            name_contains: stringWithHundredElevenLength,
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            birthdate: "20/20/20",
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            status: "NoOption",
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            country: "NoCountry".repeat(52),
          }),
          search: `country=`,
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            state: "NoState".repeat(52),
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            city: "NoCity".repeat(52),
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            district: "NoDistrict".repeat(52),
          }),
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
          headers: preparePayloadPost({
            ...USER_PAYLOAD,
            zipCode: "NoZipCode".repeat(52),
          }),
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
