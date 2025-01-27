import { InstanceDatabase } from "@database/dynamodb/instanceDatabase";

const instanceDb = new InstanceDatabase();
instanceDb.getInstance().ddb.local();
