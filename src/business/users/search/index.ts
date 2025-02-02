import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import {
  KeysOfAddressAndContactType,
  OptionsInformationUser,
  UserSearchBusinessRequest,
  UserSearchBusinessResponse,
} from "./type";
import {
  AddressProps,
  ContactProps,
  UserProps,
} from "@database/dynamodb/entities/User/user/type";
import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";
import {
  AddressSearchProps,
  ContactSearchProps,
} from "@database/dynamodb/repositories/users/type";

export class UserSearchBusiness {
  /**
   * @method execute
   * - (EN): Responsible for executing the use case that will create the user in the system.
   * - (pt-BR): Responsável pela execução do caso de uso que irá criar o usuário no sistema.
   *
   * @param {UserSaveBusinessRequest} props.objectId  (EN): The identifier of user / (pt-BR): O identificador do usuário.
   * @param {UserSaveBusinessRequest} props.name      (EN): The name of user / (pt-BR): O nome do usuário.
   * @param {UserSaveBusinessRequest} props.birthdate (EN): The birthdate of user in instance class Date of JS / (pt-BR): A data de nascimento do usuário numa instância da classe Date do JS.
   * @param {UserSaveBusinessRequest} props.status    (EN): The status of user with possibilities "ACTIVE" or "INACTIVE" / (pt-BR): O status do usuário com possibilidades em "ACTIVE" or "INACTIVE".
   * @param {UserSaveBusinessRequest} props.addresses (EN): The address of user of type AddressProps / (pt-BR): Os endereços do usuário da tipagem "AddressProps".
   * @param {UserSaveBusinessRequest} props.contacts  (EN): The contact of user of type ContactProps / (pt-BR): Os contatos do usuário da tipagem "ContactProps".
   *
   * @returns {Promise<UserSearchBusinessResponse>} The array with one or more UserEntity;
   */
  async execute({
    address,
    contact,
    ...props
  }: UserSearchBusinessRequest): Promise<UserSearchBusinessResponse> {
    const userRepository = new UserRepository();

    if (props.objectId) {
      const { dynamodeEntity, ...foundUserRestProps } =
        (await userRepository.findFirst(props)) ?? {};

      return foundUserRestProps;
    }

    let { items, count } = await userRepository.findAll(props);

    if (address)
      items = this.filterUserByAddressOrContact<AddressSearchProps>(
        items,
        address,
        "addresses"
      );

    if (contact)
      items = this.filterUserByAddressOrContact<ContactSearchProps>(
        items,
        contact,
        "contacts"
      );

    return {
      items: items.map(({ dynamodeEntity, ...userEntity }) => {
        return userEntity;
      }) as UserProps[],
      count,
    };
  }

  /**
   * @method filterUserByAddressOrContact
   * - (EN): The method will be responsible for filtering information based on the address and contact columns.
   * - (pt-BR): O método será responsável por filtrar informações baseado nas colunas de endereço e contato.
   *
   * @param {UserEntity[]} users (EN): The list records of users / (pt-BR): A lista de registros de usuários.
   * @param {K<AddressSearchProps | ContactSearchProps>} where (EN): The reference object with the comparison clauses | (pt-BR): O objeto de referência com as cláusulas de comparação
   * @param {"addresses" | "contacts"} type (EN): The type information the be filter | (pt-BR): O tipo da informação que será filtrada na entidade
   *
   * @returns {UserEntity[]} (EN): The array of userEntity filtered / (pt-BR): A lista de userEntity filtrados.
   */
  public filterUserByAddressOrContact<
    K extends AddressSearchProps | ContactSearchProps
  >(users: UserEntity[], where: K, type: OptionsInformationUser): UserEntity[] {
    const usersFiltered = users.filter((user) => {
      const addressesOrContacts = user[type];

      const recordSMatched = addressesOrContacts.filter(
        (addressOrContact: AddressProps | ContactProps) => {
          const arrayKeyAndValues = Object.entries(where);

          const recordsFiltered = arrayKeyAndValues.filter(([key, value]) => {
            return (
              addressOrContact[key as KeysOfAddressAndContactType] == value
            );
          });

          return recordsFiltered.length;
        }
      );

      return recordSMatched.length > 0;
    });

    return usersFiltered;
  }
}
