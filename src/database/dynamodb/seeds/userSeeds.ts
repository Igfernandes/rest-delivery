import { users } from "../../../data/users";
import { UserRepository } from "../repositories/userRepository";
import { UserEntity } from "../entities/User/userEntity";

export class UserSeeds {
  public async run() {
    try {
      const userRepository = new UserRepository();

      for (const user of users) {
        await userRepository.save(new UserEntity(user));
        console.log(`Inserido o usuário ${user.name}`);
      }
    } catch (err) {
      console.log(`Error no seed de users`);
      console.log(err);
    }
  }
}
