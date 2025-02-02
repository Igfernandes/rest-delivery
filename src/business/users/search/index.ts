import { UserRepository } from "@database/dynamodb/repositories/users/userRepository";
import { UserSearchBusinessRequest, UserSearchBusinessResponse } from "./type";
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

    if (address) items = this.getUserByAddress(items, address);

    if (contact) items = this.getUserByContacts(items, contact);

    return {
      items: items.map(({ dynamodeEntity, ...userEntity }) => {
        return userEntity;
      }) as UserProps[],
      count,
    };
  }

  public getUserByAddress(
    users: UserEntity[],
    where: AddressSearchProps
  ): UserEntity[] {
    return users.filter((userEntity: UserEntity) => {
      const usersFiltered = userEntity.addresses.filter(
        (addressProps: AddressProps) => {
          const addressesMatched = Object.entries(where).filter(
            ([columnKey, columnValue]) => {
              if (columnKey == "zipCode")
                return addressProps.zipCode
                  .toString()
                  .includes(columnValue.toString());

              return (
                addressProps[columnKey as keyof AddressProps] == columnValue
              );
            }
          );
          return addressesMatched.length > 0;
        }
      );

      return usersFiltered.length > 0;
    });
  }

  public getUserByContacts(
    users: UserEntity[],
    where: ContactSearchProps
  ): UserEntity[] {
    return users.filter((userEntity: UserEntity) => {
      const usersFiltered = userEntity.contacts.filter(
        (contactProps: ContactProps) => {
          const contactsMatched = Object.entries(where).filter(
            ([columnKey, columnValue]) =>
              contactProps[columnKey as keyof ContactProps] == columnValue
          );

          return contactsMatched.length > 0;
        }
      );

      return usersFiltered.length > 0;
    });
  }
}
