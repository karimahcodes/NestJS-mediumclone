import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string;
}

//we create a class with properties username, email and password.
//we designate them readonly properties because they will reside in our payload
//we add validation decorators