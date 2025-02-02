import {
  AddressProps,
  ContactProps,
  UserProps,
} from "../../entities/User/user/type";
import { UserEntity } from "../../entities/User/user/userEntity";
import { IRepository } from "../IRepository";
import { TableManager } from "dynamode";
import {
  UserDeleteProps,
  UserSearchProps,
  UserSearchReturn,
  UserUpdateProps,
} from "./type";
import { ProviderDynamode } from "@providers/dynamode";
import { removeEmptyValuesInObjects } from "@helpers/object";

const providerDatabase = new ProviderDynamode();
providerDatabase.execute();

const tableManager = new TableManager(UserEntity, {
  tableName: "users",
  partitionKey: "objectId",
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
    where: UserUpdateProps,
    { addresses, contacts, objectId, ...data }: UserProps
  ): Promise<UserEntity | false> {
    try {
      const whereFiltered = Object.fromEntries(
        Object.entries(data).filter(([colName, colValue]) => !!colValue)
      );

      const user = await this.dynamodb.update(where, {
        set: {
          ...whereFiltered,
          addresses: addresses
            ?.map((address) => removeEmptyValuesInObjects(address))
            .filter(
              (address) => !!address && Object.values(address).length > 0
            ) as AddressProps[],
          contacts: contacts
            ?.map((contact) => removeEmptyValuesInObjects(contact))
            .filter(
              (contact) => !!contact && Object.values(contact).length > 0
            ) as ContactProps[],
          updatedAt: new Date(),
        },
      });

      return user;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

  public async delete(where: UserDeleteProps): Promise<boolean> {
    try {
      await this.dynamodb.delete(where);

      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async findAll({
    name_contains,
    ...where
  }: UserSearchProps): Promise<UserSearchReturn> {
    try {
      let queryBuilder = this.dynamodb.scan();

      if (!where["objectId"]) delete where.objectId;

      Object.entries(where).forEach(async ([columnName, columnValue]) => {
        queryBuilder = queryBuilder
          .attribute(columnName as keyof UserProps)
          .eq(columnValue);
      });

      if (name_contains) queryBuilder.attribute("name").contains(name_contains);

      return queryBuilder.run();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async findFirst(where: UserSearchProps): Promise<UserEntity> {
    try {
      let queryBuilder = this.dynamodb.scan();

      if (!where["objectId"]) delete where.objectId;

      Object.entries(where).forEach(async ([columnName, columnValue]) => {
        queryBuilder = queryBuilder
          .attribute(columnName as keyof UserProps)
          .eq(columnValue);
      });

      const foundUser = await queryBuilder.run();

      return foundUser.items[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
