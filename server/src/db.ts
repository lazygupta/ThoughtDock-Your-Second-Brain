import mongoose, { model, Schema } from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL;

if (MONGODB_URI)
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.log('Database connected successfully.');
        })
        .catch((error) => {
            console.error('Database connection failed:', error);
        });

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const userModel = model("User", userSchema)
export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);