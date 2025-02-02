import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";
import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { generateKey } from "@helpers/generateKey";
import { UserSaveBusinessRequest, UserSaveBusinessResponse } from "./type";

export class UserSaveBusiness {
  /**
   * @method execute
   * - (EN): Responsible for executing the use case that will create the user in the system.
   * - (pt-BR): Responsável pela execução do caso de uso que irá criar o usuário no sistema.
   *
   * @param {UserSaveBusinessRequest} props.name      (EN): The name of user / (pt-BR): O nome do usuário.
   * @param {UserSaveBusinessRequest} props.birthdate (EN): The birthdate of user in instance class Date of JS / (pt-BR): A data de nascimento do usuário numa instância da classe Date do JS.
   * @param {UserSaveBusinessRequest} props.status    (EN): The status of user with possibilities "ACTIVE" or "INACTIVE" / (pt-BR): O status do usuário com possibilidades em "ACTIVE" or "INACTIVE".
   * @param {UserSaveBusinessRequest} props.addresses (EN): The array with address of user of type AddressProps / (pt-BR): O array com os endereços do usuário da tipagem "AddressProps".
   * @param {UserSaveBusinessRequest} props.contacts  (EN): The array with contacts of user of type ContactProps / (pt-BR): O array com os contatos do usuário da tipagem "ContactProps".
   *
   * @returns {Promise<UserSaveBusinessResponse>} Object with property "userKey" string;
   */
  async execute(
    props: UserSaveBusinessRequest
  ): Promise<UserSaveBusinessResponse> {
    const userRepository = new UserRepository();
    const userEntity = new UserEntity(props);

    userEntity.objectId = generateKey(
      process.env.DATABASE_PREFIX,
      userEntity.name.replaceAll(" ", "_").toLowerCase()
    );
    userEntity.createdAt = new Date();
    userEntity.updatedAt = new Date();

    const response = (await userRepository.save(userEntity)).toString();

    return {
      userKey: response,
    };
  }
}
