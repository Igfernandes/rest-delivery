import { InstanceDatabase } from "../instanceDatabase";
import { UsersMigration } from "./UserGroup/users_25_01_25";

(async function () {
  const instanceDb = new InstanceDatabase();
  instanceDb.getInstance().ddb.local("http://localhost:8000");

  /** USERS GROUP */
  const usersMigration = new UsersMigration();

  await usersMigration.run();
})();
