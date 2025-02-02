import attribute from "dynamode/decorators";
import { Entity } from "dynamode";
import { AddressProps, ContactProps, UserProps, UserStatus } from "./type";

export class UserEntity extends Entity {
  /**
   * @property {string} objectId
   * - (EN): The identify of user.
   * - (pt-BR): O identificador do usuário.
   */
  @attribute.partitionKey.string()
  objectId: string;

  /**
   * @property {string} name
   * - (EN): The fullname of user.
   * - (pt-BR): O nome completo do usuário
   */
  @attribute.string()
  name: string;

  /**
   * @property {Date} birthdate
   * - (EN): The birthdate of user with only day,month and year.
   * - (pt-BR): A data de aniversário do usuário apenas com o dia, mês e ano.
   */
  @attribute.date.string()
  birthdate: Date;

  /**
   * @property {string} status
   * - (EN): The status of user. Possibles status: 'Active', 'Inactive'.
   * - (pt-BR): O status do usuário. Possibilidades de status: 'Active', 'Inactive'.
   */
  @attribute.string()
  status: UserStatus;

  /**
   * @property {AddressProps} addresses
   * - (EN): The addresses of user.
   * - (pt-BR): Os endereços do usuário.
   */
  @attribute.array()
  addresses: Array<AddressProps>;

  /**
   * @property {ContactProps} contacts
   * - (EN): The contact of user.
   * - (pt-BR): Os contatos do usuário.
   */
  @attribute.array()
  contacts: Array<ContactProps>;

  /**
   * @property {Date} createdAt
   * - (EN): The date creation of user with value by seconds.
   * - (pt-BR): A data de criação do usuário por segundos.
   */
  @attribute.date.number()
  createdAt?: Date;

  /**
   * @property {Date} updatedAt
   * - (EN): The date updating of user with value by seconds.
   * - (pt-BR): A data de atualização do usuário por segundos.
   */
  @attribute.date.number()
  updatedAt?: Date;

  constructor({
    name,
    objectId,
    birthdate,
    status,
    addresses,
    contacts,
    createdAt,
    updatedAt,
  }: UserProps) {
    super();

    this.objectId = objectId ?? "";
    this.name = name;
    this.birthdate = birthdate;
    this.status = status;
    this.addresses = addresses ?? [];
    this.contacts = contacts ?? [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
