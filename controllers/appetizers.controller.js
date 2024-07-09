import multer from 'multer';
import path from 'path';
import Appetizer from '../Models/Appetizers.js';

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

// Add Appetizer with photo upload
export const addAppetizer = async (req, res) => {
    const { name, price } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const appetizer = new Appetizer({ name, price, photo });
        await appetizer.save();
        res.status(201).json({ message: 'Appetizer added successfully', appetizer });
    } catch (err) {
        res.status(500).json({ error: 'Error adding appetizer', details: err.message });
    }
};

// Update Appetizer
export const updateAppetizer = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : req.body.photo;
    try {
        const appetizer = await Appetizer.findByIdAndUpdate(id, { name, price, photo }, { new: true });
        if (!appetizer) {
            return res.status(404).json({ message: 'Appetizer not found' });
        }
        res.status(200).json({ message: 'Appetizer updated successfully', appetizer });
    } catch (err) {
        res.status(500).json({ error: 'Error updating appetizer', details: err.message });
    }
};

// Get All Appetizers
export const getAllAppetizers = async (req, res) => {
    try {
        const appetizers = await Appetizer.find();
        res.status(200).json(appetizers);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appetizers', details: err.message });
    }
};

// Delete Appetizer
export const deleteAppetizer = async (req, res) => {
    const { id } = req.params;
    try {
        const appetizer = await Appetizer.findByIdAndDelete(id);
        if (!appetizer) {
            return res.status(404).json({ message: 'Appetizer not found' });
        }
        res.status(200).json({ message: 'Appetizer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting appetizer', details: err.message });
    }
};