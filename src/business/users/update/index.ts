import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";
import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { UserUpdateBusinessRequest, UserUpdateBusinessResponse } from "./type";

export class UserUpdateBusiness {
  async execute(
    props: UserUpdateBusinessRequest
  ): Promise<UserUpdateBusinessResponse> {
    const userRepository = new UserRepository();
    const userEntity = new UserEntity(props as UserEntity);

    await userRepository.update(
      {
        objectId: props.objectId
      },
      userEntity
    );

    return {
      success: true,
    };
  }
}
