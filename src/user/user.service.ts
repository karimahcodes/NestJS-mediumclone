import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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
}

// Object.assign(newUser, createUserDto) takes in a newUser and overwrites it with a data transfer object that we've named createUserDto and assigned a property of CreateUserDto