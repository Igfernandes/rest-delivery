import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";
import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { UserUpdateBusinessRequest, UserUpdateBusinessResponse } from "./type";

export class UserUpdateBusiness {
  /**
   * @method execute
   * - (EN): Responsible for executing the use case that will update the user in the system.
   * - (pt-BR): Responsável pela execução do caso de uso que irá atualizar o usuário no sistema.
   *
   * @param {UserSaveBusinessRequest} props.objectId  (EN): The identifier of user / (pt-BR): O identificador do usuário.
   * @param {UserSaveBusinessRequest} props.name      (EN): The name of user / (pt-BR): O nome do usuário.
   * @param {UserSaveBusinessRequest} props.birthdate (EN): The birthdate of user in instance class Date of JS / (pt-BR): A data de nascimento do usuário numa instância da classe Date do JS.
   * @param {UserSaveBusinessRequest} props.status    (EN): The status of user with possibilities "ACTIVE" or "INACTIVE" / (pt-BR): O status do usuário com possibilidades em "ACTIVE" or "INACTIVE".
   * @param {UserSaveBusinessRequest} props.addresses (EN): The array with address of user of type AddressProps / (pt-BR): O array com os endereços do usuário da tipagem "AddressProps".
   * @param {UserSaveBusinessRequest} props.contacts  (EN): The array with contacts of user of type ContactProps / (pt-BR): O array com os contatos do usuário da tipagem "ContactProps".
   *
   * @returns {Promise<UserSaveBusinessResponse>} Object with property "success" boolean;
   */
  async execute(
    props: UserUpdateBusinessRequest
  ): Promise<UserUpdateBusinessResponse> {
    const userRepository = new UserRepository();
    const userEntity = new UserEntity(props as UserEntity);

    await userRepository.update(
      {
        objectId: props.objectId,
      },
      userEntity
    );

    return {
      success: true,
    };
  }
}
