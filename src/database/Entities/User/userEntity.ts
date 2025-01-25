import { attribute, Entity } from "dynamode";
import { UserProps } from "./type";
import { numberDate, stringDate } from "dynamode/decorators/helpers/dates";

const prefixDeclaration = {
  prefix: process.env.DATABASE_PREFIX,
};

export class User extends Entity {
  @attribute.partitionKey.string(prefixDeclaration)
  objectId: string;

  /**
   * @property {string} name
   * - (EN): The fullname of user.
   * - (pt-BR): O nome completo do usuário
   */
  @attribute.string(prefixDeclaration)
  name: string;

  /**
   * @property {string} name
   * - (EN): The birthdate of user with only day,month and year.
   * - (pt-BR): A data de aniversário do usuário apenas com o dia, mês e ano.
   */
  @attribute.date.string(prefixDeclaration)
  birthdate: Date;

  /**
   * @property {string} name
   * - (EN): The status of user. Possibles status: 'Active', 'Inactive'.
   * - (pt-BR): O status do usuário. Possibilidades de status: 'Active', 'Inactive'.
   */
  @attribute.string(prefixDeclaration)
  status: string;

  /**
   * @property {Date} name
   * - (EN): The date creation of user with value by seconds.
   * - (pt-BR): A data de criação do usuário por segundos.
   */
  @attribute.date.number()
  createdAt: Date;

  /**
   * @property {Date} name
   * - (EN): The date updating of user with value by seconds.
   * - (pt-BR): A data de atualização do usuário por segundos.
   */
  @attribute.date.number()
  updatedAt: Date;

  constructor({
    name,
    objectId,
    birthdate,
    status,
    createdAt,
    updatedAt,
  }: UserProps) {
    super();

    this.objectId = objectId;
    this.name = name;
    this.birthdate = birthdate;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
