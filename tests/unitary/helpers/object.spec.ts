import {
  convertObjectValuesToArray,
  removeEmptyValuesInObjects,
} from "@helpers/object";
import { messages } from "src/constants/messages";

describe("Test all functions in file helper 'object'", () => {
  describe("Test of convertObjectValuesToArray:", () => {
    const objectTest = {
      onlyString: "Apenas uma string",
      onlyNumber: 123,
      onlyBoolean: true,
    };

    describe("Success operations", () => {
      it("Should return an array", () => {
        const returnArray = convertObjectValuesToArray(objectTest);

        expect(Array.isArray(returnArray)).toBeTruthy();
      });

      it("Should return an array with 3 values", () => {
        const returnArray = convertObjectValuesToArray(objectTest);

        expect(returnArray.length).toBe(3);
      });

      it("Should return an array with value numeric '123' in second position", () => {
        const returnArray = convertObjectValuesToArray(objectTest);

        expect(typeof returnArray[1]).toBe("number");
        expect(returnArray[1]).toBe(123);
      });

      it("Should return same array insert", () => {
        const arrReference = [1, 2, 3];
        const returnArray = convertObjectValuesToArray(arrReference);

        expect(arrReference).toEqual(returnArray);
      });
    });

    describe("Failed operations", () => {
      it("Should show message of error of value passed invalid", () => {
        try {
          //@ts-ignore - Foi inserido para que seja possível forçar o erro sem o feedback do typescript.
          convertObjectValuesToArray("Only String");
        } catch (err) {
          expect(err).toBe(messages.errors.values.invalid);
        }
      });
    });
  });

  describe("Test of removeEmptyValuesInObjects:", () => {
    const objectTest = {
      onlyString: {
        name: "Test",
      },
      onlyNumber: {},
      onlyBoolean: {
        otherValue: {},
      },
    };

    describe("Success operations", () => {
      it("Should return only objects with value", () => {
        const objectReturn = removeEmptyValuesInObjects(objectTest);

        expect(objectReturn).toEqual({
          onlyString: {
            name: "Test",
          },
        });
      });
    });

    describe("Failed operations", () => {
      it("Should show message of error of object passed invalid", () => {
        try {
          //@ts-ignore - Foi inserido para que seja possível forçar o erro sem o feedback do typescript.
          removeEmptyValuesInObjects("Object Invalid");
        } catch (err) {
          expect(err).toBe(messages.errors.values.typeInvalid("objeto"));
        }
      });

      it("Should show message of error array passed isn't object invalid", () => {
        try {
          //@ts-ignore - Foi inserido para que seja possível forçar o erro sem o feedback do typescript.
          removeEmptyValuesInObjects([{}, "Only String"]);
        } catch (err) {
          expect(err).toBe(messages.errors.values.typeInvalid("objeto"));
        }
      });
    });
  });
});
