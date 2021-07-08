import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request;

    const usersRespositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRespositories.findOne(user_id);

    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized"
    })
}