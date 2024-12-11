import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
    content: {
        type: String
    },
    createdby: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    comment: [{
        commentby: {
            type: mongoose.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            trim: true,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true })


export default mongoose.model('Post', postSchema);