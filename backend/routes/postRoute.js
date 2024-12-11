import express from "express";
import { commentPost, deleteComment, deletePost, getAllPost, likePost, post, updatePost } from "../controller/postController.js";
import authToken from "../middlewares/authToken.js";
import multer from "multer";

const router = express.Router();


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), authToken, post);

router.get('/getallpost', authToken, getAllPost)

router.delete('/delete/:id', authToken, deletePost)

router.patch('/update/:id', upload.single('file'), authToken, updatePost)

router.patch('/like/:id', authToken, likePost);

router.patch('/comment', authToken, commentPost);

router.delete('/deletecomment/:cid/:pid', authToken, deleteComment);



export default router;