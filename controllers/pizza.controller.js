import Pizza from '../Models/Pizza.js';

export const addPizza = async (req, res) => {
    const { name, price } = req.body;
    try {
        const pizza = new Pizza({ name, price });
        await pizza.save();
        res.status(201).json({ message: 'Pizza added successfully', pizza });
    } catch (err) {
        res.status(500).json({ error: 'Error adding pizza', details: err.message });
    }
};

export const updatePizza = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const pizza = await Pizza.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json({ message: 'Pizza updated successfully', pizza });
    } catch (err) {
        res.status(500).json({ error: 'Error updating pizza', details: err.message });
    }
};

export const getAllPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json(pizzas);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching pizzas', details: err.message });
    }
};

export const deletePizza = async (req, res) => {
    const { id } = req.params;
    try {
        const pizza = await Pizza.findByIdAndDelete(id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json({ message: 'Pizza deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting pizza', details: err.message });
    }
};
