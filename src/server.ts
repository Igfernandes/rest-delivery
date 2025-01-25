import { InstanceDatabase } from "@database/instanceDatabase";

const instanceDb = new InstanceDatabase();
instanceDb.getInstance().ddb.local();
