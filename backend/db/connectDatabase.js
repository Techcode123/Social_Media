import mongoose from "mongoose";


export const connectDatabase = async () => {
    const DB = process.env.DB
    return mongoose.connect(DB).then(() => {
        console.log("connection is Succesfull");
    }).catch((err) => {
        console.log(err.message);
    })
}
