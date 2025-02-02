import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { UserDeleteBusinessRequest, UserDeleteBusinessResponse } from "./type";

export class UserDeleteBusiness {
  /**
   * @method execute
   * - (EN): Responsible for executing the use case that will delete the user from the system.
   * - (pt-BR): Responsável pela execução do caso de uso que irá excluir o usuário do sistema.
   *
   * @param {string} props.objectId  (EN): The identifier of user / (pt-BR): O identificador do usuário.
   * @returns {Promise<UserDeleteBusinessResponse>} Object with property "success" boolean;
   */
  async execute(
    props: UserDeleteBusinessRequest
  ): Promise<UserDeleteBusinessResponse> {
    const userRepository = new UserRepository();

    await userRepository.delete({
      objectId: props.objectId,
    });

    return {
      success: true,
    };
  }
}
