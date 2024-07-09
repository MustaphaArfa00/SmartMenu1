import Desserts from '../Models/Desserts.js';

// Add a dessert
export const addDessert = async (req, res) => {
    const { name, price,description } = req.body;
    try {
        const dessert = new Desserts({ name, price,description });
        await dessert.save();
        res.status(201).json({ message: 'Dessert added successfully', dessert });
    } catch (err) {
        res.status(500).json({ error: 'Error adding dessert', details: err.message });
    }
};

// Update a dessert
export const updateDessert = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const dessert = await Desserts.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!dessert) {
            return res.status(404).json({ message: 'Dessert not found' });
        }
        res.status(200).json({ message: 'Dessert updated successfully', dessert });
    } catch (err) {
        res.status(500).json({ error: 'Error updating dessert', details: err.message });
    }
};

// Get all desserts
export const getAllDesserts = async (req, res) => {
    try {
        const desserts = await Desserts.find();
        res.status(200).json(desserts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching desserts', details: err.message });
    }
};

// Delete a dessert
export const deleteDessert = async (req, res) => {
    const { id } = req.params;
    try {
        const dessert = await Desserts.findByIdAndDelete(id);
        if (!dessert) {
            return res.status(404).json({ message: 'Dessert not found' });
        }
        res.status(200).json({ message: 'Dessert deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting dessert', details: err.message });
    }
};
