import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { JWT_Secret } from "@app/config";
import { UserReponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });

        const userByUsername = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });
        if (userByEmail || userByUsername) {
            throw new HttpException(
                'Email or username are taken',
                HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto);
        console.log(newUser)
        return await this.userRepository.save(newUser); //saves entity to the dB
    }

    //login function finds login email's match in the repository
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email,
            },
        });

        if (!user){
            throw new HttpException(
                'Credentials are not valid', 
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        // if email is found, bcrypt method compares() hashed pw's
        const isPasswordCorrect = await compare(loginUserDto.password, user.password)

        if (!isPasswordCorrect){
            throw new HttpException(
                'Credentials are not valid',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }
        return user;
    }


    //create a method to get the User
    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } })
    }


    //JWT is a string so we want to return a type string
    generateJwt(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            JWT_Secret,
        );
    }
    

    //build THE response for your front end
    buildUserResponse(user: UserEntity): UserReponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user),
            },
        };
    }
}

/* Object.assign(newUser, createUserDto) 
    --takes in a newUser and overwrites it with a data transfer object that we've named createUserDto and assigned a property of CreateUserDto */

/* buildUserResponse(user: UserEntity): UserReponseInterface { 
    --we want a password but it's been hashed (hashing is a type) so we must create a new data type in order to receive it with the userEntity object */


/* return{ user: { ...user,token: this.generateJwt(user) 
    --sends back a user object with all of the properties of the original user object and adds a jwt token to the response body */
