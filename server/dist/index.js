"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!password || !username) {
        res.status(411).json({
            message: "Username or Password can't be empty",
        });
    }
    const foundUser = yield db_1.userModel.findOne({
        username,
    });
    if (foundUser != null) {
        res.status(403).json({
            message: "You are already signed up",
        });
        return;
    }
    else {
        try {
            bcrypt_1.default.hash(password, saltRounds, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield db_1.userModel.create({
                        username: username,
                        password: hash
                    });
                });
            });
            res.status(200).json({
                message: "Signed Up Succesfully",
            });
        }
        catch (error) {
            res.status(411).json({
                message: "Error in inputs",
            });
        }
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
    }
    try {
        const user = yield db_1.userModel.findOne({ username });
        if (user) {
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                res.status(403).json({ message: "Incorrect credentials" });
            }
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                username: user.username,
            }, config_1.JWT_PASSWORD);
            res.status(200).json({
                token: token,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "No username found", error });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type } = req.body;
        if (!link || !type) {
            res.status(400).json({ message: "Link and title are required" });
        }
        yield db_1.ContentModel.create({
            link,
            type,
            title: req.body.title,
            // @ts-ignore 
            userId: req.userId,
            tags: []
        });
        res.status(201).json({
            message: "Contents added"
        });
    }
    catch (error) {
        res.status(401).json({
            message: `Error occured ${error}`
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const contentId = req.body.contentId;
    try {
        yield db_1.ContentModel.deleteMany({
            contentId,
            // @ts-ignore
            userId: req.userId
        });
        res.status(200).json({
            message: "Content Deleted"
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Content cant be deleted except its owner"
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
app.listen(3000, () => {
    console.log("App started at 3000");
});
