export const messages = {
  errors: {
    migration: {
      alreadyCreated: (migrationName: string) =>
        `ALERTA!: Os migration ${migrationName} já existe!`,
    },
    seeds: {
      genericError: (tableName: string) =>
        `Error nos seeds ao alimentar a tabela ${tableName}`,
    },
    values: {
      invalid: "Valor passado encontra-se inválido.",
      typeInvalid: (type: string) =>
        `O valor passado é um tipo ${type} inválido`,
      onlyStrings:
        "Só podem ser passados nos parâmetros valores do tipo string",
    },
  },
  success: {
    seeds: {
      insert: (tableName: string, column: unknown) =>
        `Inserido na tabela ${tableName} o registro com valor ${column} com sucesso!`,
    },
  },
};
