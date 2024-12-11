import dotenv from "dotenv"
dotenv.config()
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import * as Cloudinary from 'cloudinary';

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const register = async (req, res) => {
    try {
        const { name, email, password, description, location } = req.body;

        const result = await Cloudinary.uploader.upload(req.file.path);

        const userExisting = await User.findOne({ email });
        if (userExisting) {

            return res.json({
                message: "email already exist"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        const user = new User({
            name, email, password: hashpassword, description, location,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });
        user.save();
        res.status(200).json({
            success: "true",
            message: "User Created Succesfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExisting = await User.findOne({ email });

        if (!userExisting) {
            return res.json({
                success: "false",
                message: "Invalid",
            })
        }

        const comparePassword = bcrypt.compareSync(password, userExisting.password);

        if (!comparePassword) {
            return res.json({
                success: "false",
                message: "Invalid",
            })
        }


        const token = jwt.sign({ id: userExisting._id }, process.env.SECRET_KEY, { expiresIn: '7d' });


        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            data: token,
            success: true,
            error: false,
            userExisting
        })


    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

export const logout = async (req, res) => {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.clearCookie('token', tokenOption);
        res.status(200).json({
            message: "Logout successfully",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

export const getUserProfile = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).populate('create  requestarrive friends').populate({
            path: 'create',
            populate: {
                path: 'comment.commentby'
            }
        });
        res.status(200).json({
            success: true,
            message: "User get Successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const user = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Users get Successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

export const editProfile = async (req, res) => {
    console.log(req.body)
    let result
    if (req.body.bool === 'true') {
        result = await Cloudinary.uploader.upload(req.file.path);
    }
    try {
        const user = await User.findById(req.userId)
        user.name = req.body?.name
        user.description = req.body.description
        user.location = req.body.location
        if (req.body.bool === 'true') {
            user.image.public_id = result.public_id
            user.image.url = result.secure_url
        }
        user.save()
        res.status(200).json({
            success: true,
            message: "Users updated Successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
        console.log(error.message)
    }
}


export const sentRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const myuser = await User.findById(req.userId);
        const anotheruser = await User.findById(id);
        // if request is already sent
        if (myuser.requestsent.includes(anotheruser._id) || myuser.requestarrive.includes(anotheruser._id)) {
            return res.status(200).json({
                message: "request already sent"
            })
        }
        //if they are already friend
        if (myuser.friends.includes(anotheruser._id)) {
            return res.status(200).json({
                message: "already a friend"
            })
        }

        myuser.requestsent.push(anotheruser._id)
        anotheruser.requestarrive.push(req.userId)

        myuser.save()
        anotheruser.save()
        res.status(200).json({
            message: "request sent",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

export const acceptRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const myuser = await User.findById(req.userId);
        const anotheruser = await User.findById(id);

        if (myuser.friends.includes(anotheruser._id)) {
            return res.status(200).json({
                message: "already a friend"
            })
        }

        myuser.requestarrive.pull(anotheruser._id)
        anotheruser.requestsent.pull(req.userId)

        myuser.friends.push(anotheruser._id)
        anotheruser.friends.push(req.userId)

        myuser.save()
        anotheruser.save()

        res.status(200).json({
            message: "friend request accepted",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

export const cancelRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const myuser = await User.findById(req.userId);
        const anotheruser = await User.findById(id);

        myuser.requestarrive.pull(anotheruser._id)
        anotheruser.requestsent.pull(req.userId)

        myuser.save()
        anotheruser.save()

        res.status(200).json({
            message: "friend request cancel",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

export const removeFriend = async (req, res) => {
    const { id } = req.params;
    try {
        const myuser = await User.findById(req.userId);
        const anotheruser = await User.findById(id);

        myuser.friends.pull(anotheruser._id)
        anotheruser.friends.pull(req.userId)

        myuser.save()
        anotheruser.save()
        res.status(200).json({
            message: "Friend Removed",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }

}

export const validation = async (req, res) => {
    res.status(200).json({
        success: true
    })
}

export const searchUser = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await User.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } },
            ],
        })
        if (results.length === 0) {
            return res.status(200).send({
                success: false,
                msg: "No Result Found",
                results,
            })
        }
        res.status(200).send({
            success: true,
            msg: "Searched User",
            results,
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            msg: "Error in Searching",
            error,
        })
    }
}