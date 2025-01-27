import { Dynamode } from "dynamode";

export type DynamodeInstance = typeof Dynamode;
export type DynamodeExceptions = {
  name: string;
  $fault: string;
  $metadata: object;
  __type: string;
};
