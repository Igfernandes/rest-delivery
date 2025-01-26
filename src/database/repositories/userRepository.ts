import { UserEntity } from "@database/Entities/User/userEntity";
import { IRepository } from "./IRepository";
import { TableManager } from "dynamode";
import { UserProps } from "@database/Entities/User/type";

export class UserRepository implements IRepository {
  private dynamodb;

  constructor() {
    const tableManager = new TableManager(UserEntity, {
      tableName: "users",
      partitionKey: "objectId",
    });

    this.dynamodb = tableManager.entityManager();
  }

  public async save(entity: UserEntity): Promise<string | number> {
    try {
      const user = await this.dynamodb.create(entity);

      return user.objectId;
    } catch (err) {
      console.log(err);

      return 0;
    }
  }

  public async update(
    { objectId, ...where }: UserProps,
    entity: UserEntity
  ): Promise<UserEntity | false> {
    try {
      Object.entries(where).forEach(([propName, propValue]) => {
        this.dynamodb
          .condition()
          .attribute(propName as keyof UserProps)
          .eq(propValue);
      });

      const user = await this.dynamodb.update(
        {
          objectId,
        },
        {
          set: entity,
        }
      );

      return user;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

  public async delete({ objectId, ...where }: UserProps): Promise<boolean> {
    try {
      Object.entries(where).forEach(([propName, propValue]) => {
        this.dynamodb
          .condition()
          .attribute(propName as keyof UserProps)
          .eq(propValue);
      });

      const user = await this.dynamodb.delete({
        objectId,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public async findAll(where: object): Promise<UserEntity[]> {
    try {
      const user = await this.dynamodb
        .query()
        .sort("descending")
        .run({ return: "output" });

      return [
        new UserEntity({
          updatedAt: new Date(),
          status: "ACTIVE",
          objectId: "seial",
          name: "teste",
          createdAt: new Date(),
          birthdate: new Date(),
        }),
      ];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //   findFirst(where: object): Promise<UserEntity> {}
}
