import { UserEntity } from "@database/dynamodb/entities/User/userEntity";
import { TableManager } from "dynamode";

export class UsersMigration {
  public async run() {
    const tableManager = new TableManager(UserEntity, {
      tableName: "users",
      partitionKey: "objectId",
    });

    const table = await tableManager.createTable();
    console.log(`Table created: ${table}`);
  }
}
