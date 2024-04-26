import { JWT_Secret } from "@app/config";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import {verify} from 'jsonwebtoken';
import { UserService } from "../user.service";


//4-26-24 2:234pm unable to resolve error when this request for auth headers is placed in postman.

@Injectable() //always include for services and middlewares
export class AuthMiddleware implements NestMiddleware{

    constructor(private readonly userService: UserService){}

    async use(req: ExpressRequest, _: Response, next: NextFunction){
        
        // console.log('authMiddle', req.headers);
        if (!req.headers.authorization){
            req.user = null;
            next();
            return;
        }
        const token = req.headers.authorization.split(' ')[1]; //we want a token but we want to split the string to separate the word 'token' from the token itself, the 2nd argument in the array

        // console.log('token', token)
        // next();

        //if token is invalid we'll get an error without try catch statement
        try{
            const decode = verify(token, JWT_Secret);
            const user = await this.userService.findById(decode.id); //finds the User by id from the token in the DB
            req.user = user;
            // console.log('decode', decode);
            next();
        } catch(err){
            req.user = null;
            next();
        }

    }
}

//export class AuthMiddleware implements NestMiddleware{ --we must implement something(NestMiddleware) that NestJS wants from us
//Middleware requires use() function and throws an error until you add it
//if (!req.headers.authoriazation){ req.user = null;  next(); return} -- if we don't have a header, then we don't have a userInfo, so the error message will express that
// const token = req.headers.authorization.split(' ')[1]; --we want a token but we want to splot the string to separate the word 'token' from the token itself, the 2nd argument in the array