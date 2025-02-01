import { Entity, TableManager } from "dynamode";
import { UserSearchReturn } from "./users/type";

export interface IRepository {
  save(entity: Entity): Promise<string | number>;

  update(where: Object, data: object): Promise<Entity | false>;

  delete(where: object): Promise<boolean>;

  findFirst(where: object): Promise<Entity>;

  findAll(where: object): Promise<UserSearchReturn>;
}

