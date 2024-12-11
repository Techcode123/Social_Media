import express from "express";
import { connectDatabase } from "./db/connectDatabase.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();

dotenv.config();



connectDatabase();

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
))
// app.use((req, res, next) => {
//     // console.log(req.headers)
//     res.header('Access-Control-Allow-Origin', req.headers.origin)
//     res.header('Access-Control-Allow-Credentials', 'true')

//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH')
//     res.header('Access-Control-Allow-Headers', "Origin,X-Requested-With,Content-Type,Accept")
//     next()
// })
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("server is running on 5000 port"))