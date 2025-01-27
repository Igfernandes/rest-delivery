import { generateKey } from "@helpers/generateKey";
import { messages } from "src/constants/messages";

describe("Test all functions in file helper 'generateKey'", () => {
  describe("Test of generateKey:", () => {
    const keyPairToTest = {
      prefix: "rest",
      suffix: "onlymail@mai.com",
    };

    describe("Success operations", () => {
      it("Should return an array", () => {
        const keyPairReturn = generateKey(
          keyPairToTest.suffix,
          keyPairToTest.prefix
        );

        expect(keyPairReturn).toContain(keyPairToTest.prefix);
        expect(keyPairReturn).toContain(keyPairToTest.suffix);
      });
    });

    describe("Failed operations", () => {
      it("Should show message of erro when insert prefix or suffix value different string", () => {
        try {
          //@ts-ignore - Foi inserido para que seja possível forçar o erro sem o feedback do typescript.
          const keyPairReturn = generateKey(123, true);

          expect(keyPairReturn).toContain(keyPairToTest.prefix);
          expect(keyPairReturn).toContain(keyPairToTest.suffix);
        } catch (err) {
          expect(err).toBe(messages.errors.values.onlyStrings);
        }
      });
    });
  });
});
