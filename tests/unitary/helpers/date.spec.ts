import { isValidBirthdate, isValidDate } from "@helpers/date"


describe("Tests of helpers in file date", () => {

    describe("Testing isValidBirthdate function", () =>{
        it("should be valid birthdate", () => {
            expect(isValidBirthdate('1998-12-08')).toBeTruthy()

        })
        it("Shouldn't be a valid birthdate", () =>{
            expect(isValidBirthdate('3060-24-32')).toBeFalsy()
        })
    })
    describe("Testing isValidDate function", () =>{
        it("should be a valid date", () =>{
            expect(isValidDate('1998-12-08')).toBeTruthy()
        })
        it("shouldn't be a valid date", () =>{
            expect(isValidDate('2550-13-08')).toBeFalsy()
        })
    })
})


