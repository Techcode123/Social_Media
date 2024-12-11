import express from "express";
import { acceptRequest, cancelRequest, editProfile, getAllUser, getUserProfile, login, logout, register, removeFriend, searchUser, sentRequest, validation } from "../controller/userController.js";
import authToken from "../middlewares/authToken.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });




router.post('/register', upload.single('file'), register)

router.get('/auth', authToken, validation)

router.post('/login', login)

router.patch('/editprofile', upload.single('file'), authToken, editProfile)

router.get('/logout', logout)

router.get('/userprofile/:id', authToken, getUserProfile);

router.get('/getAllUser', authToken, getAllUser);

router.patch('/sentrequest/:id', authToken, sentRequest)

router.patch('/acceptrequest/:id', authToken, acceptRequest)

router.patch('/cancelrequest/:id', authToken, cancelRequest)

router.patch('/removefriend/:id', authToken, removeFriend)

router.get('/search/:keyword', authToken, searchUser);



export default router;