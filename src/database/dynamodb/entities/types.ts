import { UserEntity } from "./User/user/userEntity";

export type EntityList = {
  users: UserEntity;
};

export interface IEntityBase {
  table: string;
}

export interface IEntities {
  getAttributes: () => Object;
}
