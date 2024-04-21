import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { JWT_Secret } from "@app/config";


@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ){}

    async createUser(createUserDto: CreateUserDto):Promise<UserEntity>{
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto);
        console.log(newUser)
        return await this.userRepository.save(newUser) //saves entity to the dB
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        },
        JWT_Secret,
    );
    }
//JWT is a string so we want to return a type string

    //build response for your front end
    buildUserResponse(user: UserEntity): any{
        return{
            user: {
                ...user,
                token: this.generateJwt(user)
                //sends back a user object with all of the properties of the original user object and adds a jwt token to the response body
            }
        }
    }
}

// Object.assign(newUser, createUserDto) takes in a newUser and overwrites it with a data transfer object that we've named createUserDto and assigned a property of CreateUserDto