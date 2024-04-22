
import { UserEntity } from "../user.entity";

export interface userReponseInterface{
    user: UserEntity & {token: string };
}

//this interface is a mix of properties from the token and the userEntity, so they are merged inside of the user property