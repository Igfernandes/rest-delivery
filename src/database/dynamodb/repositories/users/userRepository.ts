import { UserProps } from "../../entities/User/user/type";
import { UserEntity } from "../../entities/User/user/userEntity";
import { IRepository } from "../IRepository";
import { TableManager } from "dynamode";
import { UserSearchProps } from "./type";
import { ProviderDynamode } from "@providers/dynamode";

const providerDatabase = new ProviderDynamode();
providerDatabase.execute();

const tableManager = new TableManager(UserEntity, {
  tableName: "users",
  partitionKey: "objectId",
  sortKey: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

export class UserRepository implements IRepository {
  private dynamodb;

  constructor() {
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
    { objectId, name, addresses, contacts, ...where }: UserSearchProps,
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
          name: name ?? "",
        },
        {
          setIfNotExists: {},
        }
      );

      return user;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

  public async delete({
    objectId,
    name,
    addresses,
    contacts,
    ...where
  }: UserSearchProps): Promise<boolean> {
    try {
      Object.entries(where).forEach(([propName, propValue]) => {
        this.dynamodb
          .condition()
          .attribute(propName as keyof UserProps)
          .eq(propValue);
      });

      await this.dynamodb.delete({
        objectId,
        name: name ?? "",
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public async findAll(where: UserSearchProps): Promise<UserEntity[]> {
    try {
      console.log(
        await this.dynamodb
          .scan()
          .condition()
          .attribute("addresses.*.country" as any)
          /** @ts-ignore */
          .eq("Brazil")
          .run()
      );
      // const queryWhere = where.addresses
      // const user = await this.dynamodb
      //   .query()
      //   .sort("descending")
      //   .run({ return: "output" });

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
