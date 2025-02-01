import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { UserSearchBusinessRequest, UserSearchBusinessResponse } from "./type";

export class UserSearchBusiness {
  async execute(
    props: UserSearchBusinessRequest
  ): Promise<UserSearchBusinessResponse> {
    const userRepository = new UserRepository();

    if (props.objectId) return userRepository.findFirst(props);

    const foundUsers = await userRepository.findAll(props);

    return foundUsers.items.map(({ dynamodeEntity, ...userEntity }) => {
      return userEntity;
    });
  }
}
