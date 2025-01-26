import { InstanceDatabase } from "../instanceDatabase";
import { UserSeeds } from "./userSeeds";

(async function () {
  const instanceDb = new InstanceDatabase();
  instanceDb.getInstance().ddb.local();

  /** USER GROUP */
  const userSeeds = new UserSeeds();
  await userSeeds.run();
})();
