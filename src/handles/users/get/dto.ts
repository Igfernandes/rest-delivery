import { isValidBirthdate } from "@helpers/date";
import { messages } from "src/constants/messages";
import { object, string, number, InferType, bool } from "yup";

const MIN_LENGTH_NAME = 5;
const MAX_LENGTH_NAME = 100;
const MAX_LENGTH_CONTACT_LABEL = 200;
const MAX_LENGTH_CONTACT_VALUE = 150;
const MAX_LENGTH_COUNTRY_OR_STATE = 50;
const MAX_LENGTH_CITY_OR_DISTRICT = 100;
const MAX_LENGTH_COMPLEMENT = 100;
const LENGTH_ZIP_CODE_IN_BRAZIL = 8;

const stringDeclaration = (field: string) =>
  string().typeError(messages.errors.values.typeInvalid(field));

const addressSchema = {
  country: stringDeclaration("country").max(
    MAX_LENGTH_COUNTRY_OR_STATE,
    messages.errors.values.max("country", MAX_LENGTH_COUNTRY_OR_STATE)
  ),
  state: stringDeclaration("state").max(
    MAX_LENGTH_COUNTRY_OR_STATE,
    messages.errors.values.max("state", MAX_LENGTH_COUNTRY_OR_STATE)
  ),
  city: stringDeclaration("city").max(
    MAX_LENGTH_CITY_OR_DISTRICT,
    messages.errors.values.max("city", MAX_LENGTH_CITY_OR_DISTRICT)
  ),
  district: stringDeclaration("district").max(
    MAX_LENGTH_CITY_OR_DISTRICT,
    messages.errors.values.max("district", MAX_LENGTH_CITY_OR_DISTRICT)
  ),
  zipCode: number()
    .test(
      messages.errors.values.max("zipCode", 10),
      (zipCode) =>
        !zipCode || zipCode?.toString().length == LENGTH_ZIP_CODE_IN_BRAZIL
    )
    .typeError(messages.errors.values.typeInvalid("zipCode")),
};

const contactSchema = {
  label: stringDeclaration("label").max(MAX_LENGTH_CONTACT_LABEL),
  value: stringDeclaration("value").max(MAX_LENGTH_CONTACT_VALUE),
  isMain: bool().typeError(messages.errors.values.typeInvalid("isMain")),
};

export const userSchema = object({
  name: stringDeclaration("name")
    .min(MIN_LENGTH_NAME, messages.errors.values.min("name", MIN_LENGTH_NAME))
    .max(MAX_LENGTH_NAME, messages.errors.values.max("name", MAX_LENGTH_NAME)),
  name_contains: stringDeclaration("name_contains").max(
    MAX_LENGTH_NAME,
    messages.errors.values.max("name_contains", MAX_LENGTH_NAME)
  ),
  birthdate: stringDeclaration("birthdate").test(
    `O birthdate ${messages.errors.values.invalid.toLocaleLowerCase()}`,
    (birthdate) => !birthdate || isValidBirthdate(birthdate)
  ),
  status: stringDeclaration("status").equals(
    ["ACTIVE", "INACTIVE"],
    messages.errors.values.optionInvalid("status")
  ),
  ...addressSchema,
  ...contactSchema,
});

export type UserDtoProps = InferType<typeof userSchema>;
