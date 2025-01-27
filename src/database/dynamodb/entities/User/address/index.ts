import attribute from "dynamode/decorators";
import { AddressProps } from "./type";
import { IEntities } from "../../types";

export class AddressEntity implements IEntities {
  /**
   * @property {string} country
   * - (EN): The country where living.
   * - (pt-BR): O país onde reside.
   */
  @attribute.string()
  country: string;

  /**
   * @property {string} state
   * - (EN): The state where living.
   * - (pt-BR):O estado onde reside.
   */
  @attribute.string()
  state: string;

  /**
   * @property {string} city
   * - (EN): The city where living.
   * - (pt-BR): A cidade onde reside.
   */
  @attribute.string()
  city: string;

  /**
   * @property {string} district
   * - (EN): The district where living.
   * - (pt-BR): O bairro onde reside.
   */
  @attribute.string()
  district: string;

  /**
   * @property {string} complement
   * - (EN): The complement of address where living.
   * - (pt-BR): O complemento do endereço onde reside.
   */
  @attribute.string()
  complement: string;

  /**
   * @property {string} number
   * - (EN): The number where living.
   * - (pt-BR): O numero do endereço onde reside.
   */
  @attribute.number()
  number: number;

  /**
   * @property {string} zipCode
   * - (EN): The zipCode where living.
   * - (pt-BR): O cep de onde reside.
   */
  @attribute.number()
  zipCode: number;

  constructor({
    country,
    state,
    city,
    district,
    complement,
    number,
    zipCode,
  }: AddressProps) {
    this.country = country;
    this.state = state;
    this.city = city;
    this.district = district;
    this.complement = complement;
    this.number = number;
    this.zipCode = zipCode;
  }

  public getAttributes(): AddressProps {
    return {
      country: this.country,
      state: this.state,
      city: this.city,
      district: this.district,
      complement: this.complement,
      number: this.number,
      zipCode: this.zipCode,
    } as AddressProps;
  }
}
