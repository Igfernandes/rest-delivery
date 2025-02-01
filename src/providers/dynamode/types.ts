import { Condition, Dynamode, TableManager } from "dynamode";

export type DynamodeInstance = typeof Dynamode;
export type DynamodeExceptions = {
  name: string;
  $fault: string;
  $metadata: object;
  __type: string;
};

export type DynamodeDbMetadata = {
  tableName: string;
  partitionKey: string;
  sortKey?: string;
  indexes?: string;
  createdAt?: string;
  updatedAt?: string;
};
