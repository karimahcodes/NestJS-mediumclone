import { NestMiddleware } from "@nestjs/common";


export class AuthMiddleware implements NestMiddleware{
    async use(req, res, next){
        console.log('authMiddle', req.headers);
        next();
    }
}

//we must implement something(NestMiddleware) that NestJS wants from us
//Middleware requires use() function and throws an error until you add it
