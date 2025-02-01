import { ProviderDynamode } from "@providers/dynamode";
import { UsersMigration } from "./UserGroup/users_25_01_25";

(async function () {
  const providerDatabase = new ProviderDynamode();
  providerDatabase.getInstance().ddb.local();

  /** USERS GROUP */
  const usersMigration = new UsersMigration();

  await usersMigration.run();
})();
