import { object, string, InferType } from "yup";

export const userSchema = object({
  objectId: string().required(),
});

export type UserDtoProps = InferType<typeof userSchema>;
