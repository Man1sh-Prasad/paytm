import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: truem,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
})

export const User = mongoose.model("User", userSchema);