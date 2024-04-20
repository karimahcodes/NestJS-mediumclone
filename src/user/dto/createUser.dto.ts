
export class CreateUserDto {
    readonly username: string
    readonly email: string
    readonly password: string;
}

//we create a class with properties username, email and password.
//we designate them readonly properties because they will reside in our payload