import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";
import { DynamodeExceptions } from "@database/dynamodb/types";
import { TableManager } from "dynamode";
import { messages } from "src/constants/messages";

export class UsersMigration {
  public async run() {
    const tableName = "users";
    try {
      const tableManager = new TableManager(UserEntity, {
        tableName: tableName,
        partitionKey: "objectId",
      });

      const table = await tableManager.createTable();
      console.log(`Table created: ${JSON.stringify(table)}`);
    } catch (err: unknown) {
      const knowError = err as DynamodeExceptions;

      if (knowError["__type"].includes("ResourceInUseException"))
        return console.log(messages.errors.migration.alreadyCreated(tableName));

      throw err;
    }
  }
}
