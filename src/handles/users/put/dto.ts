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

const ruleStringRequired = string().required();

const addressSchema = array().of(
  object({
    country: ruleStringRequired.max(MAX_LENGTH_COUNTRY_OR_STATE),
    state: ruleStringRequired.max(MAX_LENGTH_COUNTRY_OR_STATE),
    city: ruleStringRequired.max(MAX_LENGTH_CITY_OR_DISTRICT),
    district: ruleStringRequired.max(MAX_LENGTH_CITY_OR_DISTRICT),
    complement: string().max(MAX_LENGTH_COMPLEMENT),
    number: number(),
    zipCode: number()
      .test(
        "Should zipCode be a number with 15 characters",
        (zipCode) => zipCode?.toString().length == LENGTH_ZIP_CODE_IN_BRAZIL
      )
      .required(),
  })
);

const contactSchema = array().of(
  object({
    label: string().max(MAX_LENGTH_CONTACT_LABEL).required(),
    value: string().max(MAX_LENGTH_CONTACT_VALUE).required(),
    isMain: bool().default(false),
  })
);

export const userSchema = object({
  objectId: string().required(),
  name: string().min(MIN_LENGTH_NAME).max(MAX_LENGTH_NAME).required(),
  birthdate: string().test(isValidBirthdate).required(),
  status: string().equals(["ACTIVE", "INACTIVE"]),
  addresses: addressSchema,
  contacts: contactSchema,
});

export type UserDtoProps = InferType<typeof userSchema>;
