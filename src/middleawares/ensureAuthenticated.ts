import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "115ecf0bdab238a4d80c596ad5b8363bed556a677cca15af9c81cc8d") as Ipayload;

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }


}
