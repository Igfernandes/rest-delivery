import { ProviderDynamode } from "@providers/dynamode";
import { UserSeeds } from "./userSeeds";

(async function () {
  const providerDatabase = new ProviderDynamode();
  providerDatabase.getInstance().ddb.local();

  /** USER GROUP */
  const userSeeds = new UserSeeds();
  await userSeeds.run();
})();
