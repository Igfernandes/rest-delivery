import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { Dynamode } from "dynamode";
import { DynamodeInstance } from "./types";

/**
 * @class ProviderDatabase
 * - Classe responsável por gerenciar a instância inicial para relacionamento com o banco de dados.
 *
 * @property {Dynamode} instance A propriedade responsável por armazenar a instância única.
 * @method {}
 */
export class ProviderDynamode {
  private instance: DynamodeInstance;

  constructor() {
    this.instance = this.getInstance();
  }

  public getInstance(): DynamodeInstance {
    if (this.instance) return this.instance;

    const dynamo = new DynamoDB({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    } as DynamoDBClientConfig);

    Dynamode.ddb.set(dynamo);
    this.instance = Dynamode;

    return this.instance;
  }

  public execute() {
    const providerDatabase = new ProviderDynamode();
    const instanceDatabase = providerDatabase.getInstance();
    instanceDatabase.ddb.local();
  }
}
