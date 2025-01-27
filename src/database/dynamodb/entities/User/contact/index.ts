import attribute from "dynamode/decorators";
import { ContactProps } from "./type";
import { IEntities } from "../../types";

export class ContactEntity implements IEntities {
  /**
   * @property {string} label
   * - (EN): The identification of contact: email, cellphone e others.
   * - (pt-BR): O identificador do contato: email, celular e outros.
   */
  @attribute.string()
  label: string;

  /**
   * @property {string} value
   * - (EN): The value of contact
   * - (pt-BR): O valor do contato.
   */
  @attribute.string()
  value: string;

  /**
   * @property {boolean} isMain
   * - (EN): Defined if contact is main or not.
   * - (pt-BR): Define se o contato é o principal ou não.
   */
  @attribute.boolean()
  isMain: boolean;

  constructor({ label, value, isMain }: ContactProps) {
    this.label = label;
    this.value = value;
    this.isMain = isMain ?? false;
  }

  public getAttributes(): ContactProps {
    return {
      label: this.label,
      value: this.value,
      isMain: this.isMain,
    } as ContactProps;
  }
}
