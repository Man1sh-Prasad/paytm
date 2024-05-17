import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "Auth required"})
    }

    const jwtToken = authHeader.split(" ")[1];

    try {
        const decodedUser = jwt.verify(jwtToken, JWT_SECRET)
        if(decodedUser.userId) {
            req.userId = decodedUser.userId;        // putting userId in req object
            next();
        } else {
            return res.status(401).json({
                message: "Error while logging in"
            })
        }
    } catch(error) { 
        return res.status(411).json({
            message: "Something went wrong",
            error
        })
    }
    
}