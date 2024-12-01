import express, { Application, NextFunction } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
require('dotenv').config()
import bcrypt from 'bcrypt'
const saltRounds = 10
import { userModel, ContentModel, LinkModel } from "./db"
import { userMiddleware } from './middleware'
import { Request, Response } from "express";
import { random } from './utils'
import { JWT_PASSWORD } from './config'


const app = express()
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!password || !username) {
        res.status(411).json({
            message: "Username or Password can't be empty",
        });
    }

    const foundUser = await userModel.findOne({
        username,
    });

    if (foundUser != null) {
        res.status(403).json({
            message: "You are already signed up",
        });
        return;
    } else {
        try {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                await userModel.create({
                    username: username,
                    password: hash
                });
            });
            res.status(200).json({
                message: "Signed Up Succesfully",
            });
        } catch (error) {
            res.status(411).json({
                message: "Error in inputs",
            });
        }
    }
})

app.post("/api/v1/signin", async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const user = await userModel.findOne({ username });
        if(user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(403).json({ message: "Incorrect credentials" });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                },
                JWT_PASSWORD
            );

            res.status(200).json({
                message: "You are successfully signed in",
                token: token,
            });
        }
    } catch (error) {
        res.status(500).json({ message: "No username found", error });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    
    try {
        const { link, type } = req.body;
        if (!link || !type) {
            res.status(400).json({ message: "Link and title are required" });
        }
        await ContentModel.create({
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
    } catch (error) {
        res.status(401).json({
            message: `Error occured ${error}`
        })
    }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {

    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteMany({
            contentId,
            // @ts-ignore
            userId: req.userId
        })
        res.status(200).json({
            message: "Content Deleted"
        })
    } catch (error) {
        res.status(403).json({
            message: "Content cant be deleted except its owner"
        })
    }

})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share: Boolean = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                // @ts-ignore
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
            }
            const hash = random(10);
            await LinkModel.create({
                // @ts-ignore
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000, () => {
    console.log("App started at 3000");
})