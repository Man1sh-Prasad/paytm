import express from "express";
import connectDB from "./db.js";
import dotenv from 'dotenv';
import { Router } from "express";
import rootRouter from './routes/index.js';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json())

dotenv.config();

const router = Router();

app.get('/', (req, res) => {
    res.send("helo world")
})

connectDB()
    .then(() => {
        try {
            app.listen(3000, () => {
                console.log("listening");
            })
        } catch(error) {
            console.log('Error while listening')
        }
    })
    .catch((error) => {
        console.log('MongoDB connection failed !!', error)
    })

app.use('/api/v1', rootRouter);
