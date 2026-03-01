import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {

        const { token } = req.cookies;
        let o_res = {};

        if (token === undefined || token === null || token === '') {
            o_res = {
                message: ["Tu sesión no es válida o ha expirado. Por favor, vuelve a iniciar sesión"],
                error: "Unauthorized",
                statusCode: 401,
            }
            throw new HttpException(o_res, HttpStatus.UNAUTHORIZED);
        }

        jwt.verify(token, process.env.POSTGRES_SECRET, (err: any, user: any) => {
            if (err) {
                o_res = {
                    message: ["No tienes permisos para acceder a este recurso"],
                    error: "Forbidden",
                    statusCode: 403,
                }
                throw new HttpException(o_res, HttpStatus.FORBIDDEN);
            }

            req.user = user;

            next();
        })
    }
}