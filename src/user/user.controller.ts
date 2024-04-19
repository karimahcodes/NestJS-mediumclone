
import { Controller, Post } from "@nestjs/common";
import { UserService } from "@app/user/user.service";


@Controller()
export class UserController{
    constructor( private readonly userService: UserService){}
    @Post('users') 
        //users indicates you want this on the /users route and not the /home route
    async createUser(): Promise<any> {
        return this.userService.createUser();
    }
}