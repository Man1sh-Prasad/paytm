import { Router } from "express";
import { User } from '../models/user.model.js'
import { signinSchema, userSchema } from "../types.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// signup 
router.post('/signup', async (req, res) => {
    // validate input using zod 
    const response = userSchema.safeParse(req.body);
    if(!response.success) {
        return res.status(411).json({
            message: 'Incorrect Inputs'
        })
    }

    // check if user already exists 
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser) {
        return res.status(411).json({
            message: 'Email already taken'
        })
    }

    // hash password
    const saltRounds = 10;
    const plainTextPassword = req.body.password;
    // First method to generate a salt and then create hash
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(plainTextPassword, salt);

    // save new user in db
    const newUser = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.username,
        password: hashPassword
    })

    const userId = newUser._id;

    const token =  jwt.sign({ userId }, JWT_SECRET);

    return res.status(200).json({
        message: "User created succesfully",
        token: token
    });
});

// signin 
router.post('/signin', authMiddleware, async (req, res) => {
    // validate input 
    const response = signinSchema.safeParse(req.body);
    if(!response.success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    // verify user
    const user = await User.findOne({
        username: req.body.username
    })
    if(user) {
        const userToken = jwt.sign(req.userId, JWT_SECRET)
        return res.status(200).json({token: userToken})
    } else {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    
})

export default router;