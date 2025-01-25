import { attribute, Entity } from "dynamode";
import { UserProps } from "./type";
import { numberDate, stringDate } from "dynamode/decorators/helpers/dates";

const prefixDeclaration = {
  prefix: process.env.DATABASE_PREFIX,
};

export class User extends Entity {
  @attribute.partitionKey.string(prefixDeclaration)
  object_id: string;

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
  created_at: Date;

  /**
   * @property {Date} name
   * - (EN): The date updating of user with value by seconds.
   * - (pt-BR): A data de atualização do usuário por segundos.
   */
  @attribute.date.number()
  updated_at: Date;

  constructor({
    name,
    object_id,
    birthdate,
    status,
    created_at,
    updated_at,
  }: UserProps) {
    super();

    this.object_id = object_id;
    this.name = name;
    this.birthdate = birthdate;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
