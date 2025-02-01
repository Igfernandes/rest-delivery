import { isValidBirthdate } from "@helpers/date";
import { object, string, number, InferType, array, bool } from "yup";

const MIN_LENGTH_NAME = 5;
const MAX_LENGTH_NAME = 100;
const MAX_LENGTH_CONTACT_LABEL = 200;
const MAX_LENGTH_CONTACT_VALUE = 150;
const MAX_LENGTH_COUNTRY_OR_STATE = 50;
const MAX_LENGTH_CITY_OR_DISTRICT = 100;
const MAX_LENGTH_COMPLEMENT = 100;
const LENGTH_ZIP_CODE_IN_BRAZIL = 8;

const addressSchema = object({
  country: string().max(MAX_LENGTH_COUNTRY_OR_STATE),
  state: string().max(MAX_LENGTH_COUNTRY_OR_STATE),
  city: string().max(MAX_LENGTH_CITY_OR_DISTRICT),
  district: string().max(MAX_LENGTH_CITY_OR_DISTRICT),
  complement: string().max(MAX_LENGTH_COMPLEMENT),
  number: number(),
  zipCode: number().test(
    "Should zipCode be a number with 15 characters",
    (zipCode) =>
      !zipCode || zipCode?.toString().length == LENGTH_ZIP_CODE_IN_BRAZIL
  ),
});

const contactSchema = object({
  label: string().max(MAX_LENGTH_CONTACT_LABEL),
  value: string().max(MAX_LENGTH_CONTACT_VALUE),
  isMain: bool(),
});

const NAME_RULES = string().min(MIN_LENGTH_NAME).max(MAX_LENGTH_NAME);

export const userSchema = object({
  name:  string().min(MIN_LENGTH_NAME),
  name_contains:  string().max(MAX_LENGTH_NAME),
  birthdate: string().test(
    "A data de nascimento é inválida",
    (birthdate) => !birthdate || isValidBirthdate(birthdate)
  ),
  status: string().equals(["ACTIVE", "INACTIVE"]),
  address: addressSchema,
  contact: contactSchema,
});

export type UserDtoProps = InferType<typeof userSchema>;
