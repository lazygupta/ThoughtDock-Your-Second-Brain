import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    console.log(header);
    

    if (!header) {
        res.status(401).json({ message: "No token received" });
    } else {
        // @ts-ignore
        jwt.verify(header as string, JWT_PASSWORD, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    message: "You are not logged in"
                })
            }
            // @ts-ignore: Ensure decoded has the correct structure or adjust typing
            req.userId = (decoded as JwtPayload).id;
            next();
        });
    }
};
