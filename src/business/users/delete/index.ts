import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { UserDeleteBusinessRequest, UserDeleteBusinessResponse } from "./type";

export class UserDeleteBusiness {
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
