
// import { UserEntity } from "../user.entity";
import { UserType } from "./user.type";

export interface UserReponseInterface{
    user: UserType & {token: string };
}

//this interface is a mix of properties from the token and the userEntity, so they are merged inside of the user property. Because, however, we want to return a user object without a hashed password, we create a user type called UserType that omits the hash, and replace user: UserEntity with user: UserType.