import { Router } from "express";
import { User } from '../models/user.model.js'
import { signinSchema, updateSchema, userSchema } from "../types.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { Account } from "../models/account.model.js";

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
        lastname: req.body.lastname,
        password: hashPassword
    })

    const userId = newUser._id;

    // create new account and give balance between 1 to 10000
    const newAccount = await Account.create({
        userId: userId,
        balance: Math.random() * 10000
    })

    const token =  jwt.sign({ userId }, JWT_SECRET);

    return res.status(200).json({
        message: "User created succesfully",
        token: token,
        balance: newAccount.balance
    });
});

// signin 
router.post('/signin', async (req, res) => {
    // validate input 
    const response = signinSchema.safeParse(req.body);
    if(!response.success) {
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }

    // verify user
    const user = await User.findOne({
        username: req.body.username
    })
    if(!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }

    // verify password
    const hashPassword = user.password      // password from database
    const plainTextPassword = req.body.password     // password given by the user

    const isPasswordCorrect = await bcrypt.compare(plainTextPassword, hashPassword)
    if(isPasswordCorrect) {
        const userToken = jwt.sign({userId: user._id}, JWT_SECRET)
        return res.status(200).json({token: userToken})
    } else {
        return res.status(401).json({
            message: "Error while logging in"
        })
    }   
})

//update
router.put('/', authMiddleware, async (req, res) => {
    const response = updateSchema.safeParse(req.body);
    if(!response.success) {
        return res.status(411).json({
            message: "Error while updating information. Please provide valid inputs"
        })
    }

    const userId = req.userId;  // we are getting this userId from authMiddleware

    const updateUser = await User.findByIdAndUpdate(userId, req.body)
    if(updateUser) {
        return res.status(200).json({
            message: "Updated Successfully"
        })
    } else {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
})

// get user from backend via firstname or last name 
router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter;

    const users = await User.find({
        $or: [
            {firstname: filter},
            {lastname: filter}
        ]
    })

    // if(users) {
    //     const userInfo = users.map(user => {
    //         const { _id, firstname, lastname } = user;
    //         return { _id, firstname, lastname }
    //     })
    //     return res.status(200).json({
    //         users: userInfo
    //     })
    // }

    if(users) {
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        })
    }
})

export default router;