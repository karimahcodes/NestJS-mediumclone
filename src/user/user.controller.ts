
import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "./dto/createUser.dto";
// import { UserEntity } from "./user.entity";
import { UserReponseInterface } from "./types/userResponse.interface";

@Controller()
export class UserController{
    constructor( private readonly userService: UserService){}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto
    ): Promise<UserReponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    async currentUser(@Req() request: Request): Promise<UserReponseInterface>{
        console.log('request', request);
        return 'currentUser' as any;
    }
}  

//@Post('users') indicates you want this on the /users route and not the /home route
//@Body('user') indicates we only want the user property back from the object that is the request Body.
//createUserDto:any is a local property we've named of datatype or interface any but we must create a class called createUserDto (stored in user/dto/createUser.dto.ts) instead because the interface is only read by Typescript and not JS, but classes are recognized in JS
//update Promise to return the <UserResponseInterface> instead of <UserEntity> because it will omit the password in the userEntity. i.e. we receive the password but never share it (I think)
// @UsePipes(new ValidationPipe()) brings validation rules to createUserDTO inside our method.