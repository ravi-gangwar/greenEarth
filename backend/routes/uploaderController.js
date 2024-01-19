import express from 'express';
import { upload } from '../middlewares/multer.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const uploaderController = express.Router();

uploaderController.post('/profile-upload', upload.single('userProfile'), async (req, res) => {
    if(req.file){
        try {
            const file = req.file;
            const newPath = await uploadOnCloudinary(file.path);
    
            const urls = [newPath.secure_url]; 
            res.status(200).json({
                message: "uploaded",
                data: urls,
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "error while uploading",
                error: error.message,
            });
        }
    }  
});

export default uploaderController;
