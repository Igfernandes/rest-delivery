import { InstanceDatabase } from "./database/InstaceDatabase";

const instanceDb = new InstanceDatabase();
instanceDb.getInstance().ddb.local();
