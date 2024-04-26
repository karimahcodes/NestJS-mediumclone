import { ExpressRequest } from "@app/types/expressRequest.interface";
import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export class AuthMiddleware implements NestMiddleware{
    async use(req: ExpressRequest, res: Response, next: NextFunction){
        console.log('authMiddle', req.headers);
        if (!req.headers.authorization){
            req.user = null
            next()
            return
        }
        const token = req.headers.authorization.split(' ')[1]; //we want a token but we want to splot the string to separate the word 'token' from the token itself, the 2nd argument in the array

        next();
    }
}

//export class AuthMiddleware implements NestMiddleware{ --we must implement something(NestMiddleware) that NestJS wants from us
//Middleware requires use() function and throws an error until you add it
//if (!req.headers.authoriazation){ req.user = null;  next(); return} -- if we don't have a header, then we don't have a userInfo, so the error message will express that
// const token = req.headers.authorization.split(' ')[1]; --we want a token but we want to splot the string to separate the word 'token' from the token itself, the 2nd argument in the array