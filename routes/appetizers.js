import express from 'express';
import multer from 'multer';
import path from 'path';
import { addAppetizer, updateAppetizer, getAllAppetizers, deleteAppetizer } from '../controllers/appetizers.controller.js';

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploads to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as filename
    }
});

const upload = multer({ storage });

// Routes
router.post('/addAppetizer', upload.single('photo'), addAppetizer);
router.put('/updateAppetizer/:id', upload.single('photo'), updateAppetizer);
router.get('/getAllAppetizers', getAllAppetizers);
router.delete('/deleteAppetizer/:id', deleteAppetizer);

export default router;
