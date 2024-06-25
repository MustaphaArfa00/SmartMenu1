import Pasta from '../Models/Pasta.js';

export const addPasta = async (req, res) => {
    const { name, price } = req.body;
    try {
        const pasta = new Pasta({ name, price });
        await pasta.save();
        res.status(201).json({ message: 'Pasta added successfully', pasta });
    } catch (err) {
        res.status(500).json({ error: 'Error adding pasta', details: err.message });
    }
};

export const updatePasta = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const pasta = await Pasta.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!pasta) {
            return res.status(404).json({ message: 'Pasta not found' });
        }
        res.status(200).json({ message: 'Pasta updated successfully', pasta });
    } catch (err) {
        res.status(500).json({ error: 'Error updating pasta', details: err.message });
    }
};

export const getAllPastas = async (req, res) => {
    try {
        const pastas = await Pasta.find();
        res.status(200).json(pastas);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching pastas', details: err.message });
    }
};

export const deletePasta = async (req, res) => {
    const { id } = req.params;
    try {
        const pasta = await Pasta.findByIdAndDelete(id);
        if (!pasta) {
            return res.status(404).json({ message: 'Pasta not found' });
        }
        res.status(200).json({ message: 'Pasta deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting pasta', details: err.message });
    }
};
