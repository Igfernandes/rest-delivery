import { messages } from "src/constants/messages";
import { users } from "../../../data/users";
import { UserEntity } from "../entities/User/user/userEntity";
import { UserRepository } from "../repositories/users/userRepository";

export class UserSeeds {
  public async run() {
    try {
      const userRepository = new UserRepository();

      for (const user of users) {
        await userRepository.save(new UserEntity(user));
        console.log(messages.success.seeds.insert("users", user.name));
      }
    } catch (err) {
      console.log(messages.errors.seeds.genericError("users"));
      throw console.log(err);
    }
  }
}
