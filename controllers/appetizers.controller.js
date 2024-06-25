import Appetizer from '../Models/Appetizers.js'

export const addAppetizer = async (req, res) => {
    const { name, price } = req.body;
    try {
        const appetizer = new Appetizer({ name, price });
        await appetizer.save();
        res.status(201).json({ message: 'Appetizer added successfully', appetizer });
    } catch (err) {
        res.status(500).json({ error: 'Error adding appetizer', details: err.message });
    }
};

export const updateAppetizer = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const appetizer = await Appetizer.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!appetizer) {
            return res.status(404).json({ message: 'Appetizer not found' });
        }
        res.status(200).json({ message: 'Appetizer updated successfully', appetizer });
    } catch (err) {
        res.status(500).json({ error: 'Error updating appetizer', details: err.message });
    }
};

export const getAllAppetizers = async (req, res) => {
    try {
        const appetizers = await Appetizer.find();
        res.status(200).json(appetizers);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching appetizers', details: err.message });
    }
};

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
