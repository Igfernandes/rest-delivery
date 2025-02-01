import { VALID_DATE } from "@constants/regex";

describe("Test all regex of file", () => {
  describe("Test regex of date", () => {
    const mockDate = "2022-10-22";

    it("Should be an date valid", () =>
      expect(VALID_DATE.test(mockDate)).toBeTruthy());
    it("Shouldn't be an date valid", () =>
      expect(VALID_DATE.test("451-121-5111")).toBeFalsy());
    it("Shouldn't be a month date valid", () =>
      expect(VALID_DATE.test("1998-13-12")).toBeFalsy())
  });
});
