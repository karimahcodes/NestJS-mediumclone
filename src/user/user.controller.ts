
import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "./dto/createUser.dto";


@Controller()
export class UserController{
    constructor( private readonly userService: UserService){}

    @Post('users')       
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(createUserDto);
    }
}  

//@Post('users') indicates you want this on the /users route and not the /home route
//@Body('user') indicates we only want the user property back from the object that is 
//createUserDto:any is a local property of datatype or interface any but we must create a class called createUserDto (stored in user/dto/createUser.dto.ts) instead because the interface is only read by Typescript and not JS, but classes are recognized in JS