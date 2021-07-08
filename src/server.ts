import express, { json, NextFunction, Request, Response } from "express";
import 'reflect-metadata';
import 'express-async-errors';

import './database';
import { router } from "./routes";

const app = express();

app.use(json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server errror"
    })
})

app.listen(3000, () => console.log("Server is running"));