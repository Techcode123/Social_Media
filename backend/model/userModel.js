import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    image: {
        public_id: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default: "",
        },
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userprofile: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    },
    create: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }],
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    requestsent: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    requestarrive: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true })

export default mongoose.model('User', userSchema);