"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(401).json({ message: "No token received" });
    }
    else {
        // @ts-ignore
        jsonwebtoken_1.default.verify(header, config_1.JWT_PASSWORD, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    message: "You are not logged in"
                });
            }
            // @ts-ignore: Ensure decoded has the correct structure or adjust typing
            req.userId = decoded.id;
            next();
        });
    }
};
exports.userMiddleware = userMiddleware;
