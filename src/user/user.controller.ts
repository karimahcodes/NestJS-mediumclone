
import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";


@Controller()
export class UserController{
    constructor( private readonly userService: UserService){}

    @Post('users')       
    async createUser(
        @Body('user') createUserDto: CreateUserDto
    ): Promise<UserEntity> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user)
    }
}  

//@Post('users') indicates you want this on the /users route and not the /home route
//@Body('user') indicates we only want the user property back from the object that is the request Body.
//createUserDto:any is a local property we've named of datatype or interface any but we must create a class called createUserDto (stored in user/dto/createUser.dto.ts) instead because the interface is only read by Typescript and not JS, but classes are recognized in JS