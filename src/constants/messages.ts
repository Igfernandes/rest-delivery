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
  },
  success: {
    seeds: {
      insert: (tableName: string, column: unknown) =>
        `Inserido na tabela ${tableName} o registro com valor ${column} com sucesso!`,
    },
  },
};
