import { UserProps } from "@database/dynamodb/entities/User/user/type";
import { UserEntity } from "@database/dynamodb/entities/User/user/userEntity";
import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { generateKey } from "@helpers/generateKey";
import { UserSaveBusinessResponse } from "./type";

export class UserSaveBusiness {
  async execute(props: UserProps): Promise<UserSaveBusinessResponse> {
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
