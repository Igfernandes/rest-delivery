import { ProviderDynamode } from "@providers/dynamode";
import { UserSeeds } from "./userSeeds";

/**
 * - A função abaixo executará as operações e ações declaradas para alimentação por seeds.
 */
(async function () {
  const providerDatabase = new ProviderDynamode();
  providerDatabase.getInstance().ddb.local();

  /** USER GROUP */
  const userSeeds = new UserSeeds();
  await userSeeds.run();
})();
