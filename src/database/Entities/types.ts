import { UserEntity } from "./User/userEntity";

export type ModelList = {
  UserEntity: UserEntity;
};

export interface IEntity {
  table: string;
}
