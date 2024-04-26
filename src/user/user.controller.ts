
import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "./dto/createUser.dto";
// import { UserEntity } from "./user.entity";
import { UserReponseInterface } from "./types/userResponse.interface";
import { Request } from "express";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { LoginUserDto } from "./dto/loginUser.dto";


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

    
    @Post('users/login') // login function operates on the same route as users and is a POST request
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') loginDto: LoginUserDto
    ): Promise<UserReponseInterface> { //returns the type that we registered with
        console.log('loginDto', loginDto);
        return 'Login' as any
        /*const user = await this.userService.login(LoginUserDto)
        return this.userService.buildUserResponse(user) //user type returns userEntity not userResponse because it automatically adds a token to the response
        */
    }


    @Get('user')
    async currentUser(@Req() request: ExpressRequest): Promise<UserReponseInterface>{
        console.log('current user in controller', request.user)
        return 'currentUser' as any;
    }
}  

//@Post('users') indicates you want this on the /users route and not the /home route
//@Body('user') indicates we only want the user property back from the object that is the request Body.
//createUserDto:any is a local property we've named of datatype or interface any but we must create a class called createUserDto (stored in user/dto/createUser.dto.ts) instead because the interface is only read by Typescript and not JS, but classes are recognized in JS
//update Promise to return the <UserResponseInterface> instead of <UserEntity> because it will omit the password in the userEntity. i.e. we receive the password but never share it (I think)
// @UsePipes(new ValidationPipe()) brings validation rules to createUserDTO inside our method.