import Drinks from '../Models/Drinks.js'

// Add a drink
export const addDrink = async (req, res) => {
    const { name, price } = req.body;
    try {
        const drink = new Drinks({ name, price });
        await drink.save();
        res.status(201).json({ message: 'Drink added successfully', drink });
    } catch (err) {
        res.status(500).json({ error: 'Error adding drink', details: err.message });
    }
};

// Update a drink
export const updateDrink = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const drink = await Drinks.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!drink) {
            return res.status(404).json({ message: 'Drink not found' });
        }
        res.status(200).json({ message: 'Drink updated successfully', drink });
    } catch (err) {
        res.status(500).json({ error: 'Error updating drink', details: err.message });
    }
};

// Get all drinks
export const getAllDrinks = async (req, res) => {
    try {
        const drinks = await Drinks.find();
        res.status(200).json(drinks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching drinks', details: err.message });
    }
};

// Delete a drink
export const deleteDrink = async (req, res) => {
    const { id } = req.params;
    try {
        const drink = await Drinks.findByIdAndDelete(id);
        if (!drink) {
            return res.status(404).json({ message: 'Drink not found' });
        }
        res.status(200).json({ message: 'Drink deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting drink', details: err.message });
    }
};
