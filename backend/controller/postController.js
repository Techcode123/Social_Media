import dotenv from "dotenv"
dotenv.config()
import Post from "../model/postModel.js"
import User from "../model/userModel.js"
import * as Cloudinary from 'cloudinary';

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


export const post = async (req, res) => {
    const { content } = req.body

    const result = await Cloudinary.uploader.upload(req.file.path);


    const user = await User.findById(req.userId)
    const post = new Post({
        image: {
            public_id: result.public_id,
            url: result.secure_url
        }, content
    })

    user.create.push(post._id)
    post.createdby = req.userId

    user.save();
    post.save();

    res.status(200).json({
        success: true,
        message: "Post Created Successfully"
    })
}


export const getAllPost = async (req, res) => {
    try {
        const post = await Post.find({}).sort({ createdAt: -1 }).populate({
            path: 'createdby comment.commentby',
        });
        res.status(200).json({
            success: true,
            message: "Post Got Successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error
        })
    }
}


export const deletePost = async (req, res) => {

    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        const user = await User.findById(req.userId)
        user.create.pull(post._id);
        user.save()

        return res.status(200).json({
            success: "true",
            message: "post deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error
        })
    }

}


export const updatePost = async (req, res) => {
    const { id } = req.params
    let result;
    console.log(req.body)
    if (req.body.bool === 'true') {
        result = await Cloudinary.uploader.upload(req.file.path);
    }
    try {
        const post = await Post.findById(id)
        post.content = req.body.content
        if (req.body.bool === 'true') {
            post.image.public_id = result.public_id
            post.image.url = result.secure_url
        }
        post.save()
        return res.status(200).json({
            success: "true",
            message: "post updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error
        })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (post.likes.includes(req.userId)) {
            post.likes.pull(req.userId)
            res.status(200).json({
                success: "true",
                message: "post disliked successfully"
            })
        }
        else {
            post.likes.push(req.userId)
            res.status(200).json({
                success: "true",
                message: "post liked successfully"
            })

        }
        post.save()

    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error
        })
    }

}

export const commentPost = async (req, res) => {
    const { text, id } = req.body;

    try {
        const post = await Post.findById(id);
        post.comment.push({
            commentby: req.userId,
            text
        })
        post.save();
        res.status(200).json({
            success: "true",
            message: "Comment Added",
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error.message
        })
    }




}

export const deleteComment = async (req, res) => {
    const { pid, cid } = req.params;

    try {
        const post = await Post.findById(pid);
        post.comment.pull({
            _id: cid,
        })
        post.save();
        res.status(200).json({
            success: "true",
            message: "Commented deleted "
        })
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error.message
        })
    }




}