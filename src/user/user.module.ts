import { Module } from "@nestjs/common";
import { UserController } from "@app/user/user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])], 
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], //because we want userService accessible outside our user Module we have to export
})

export class UserModule{}