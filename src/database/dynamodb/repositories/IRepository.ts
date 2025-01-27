import { Entity } from "dynamode";

export interface IRepository {
  save(entity: Entity): Promise<string | number>;

  update(where: Object, entity: Entity): Promise<Entity | false>;

  delete(where: object): Promise<boolean>;

  // findFirst(where: object): Promise<Entity>;

  // findAll(where: object): Promise<Entity[]>;
}
