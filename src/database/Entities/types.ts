import { Entity } from "dynamode";
import { UserEntity } from "./User/userEntity";

export type EntityList = {
  users: UserEntity;
};

type EntityReference = typeof Entity;

export interface IEntityBase {
  table: string;
}

export interface IEntity<K extends keyof EntityList> {
  table: K;
}
