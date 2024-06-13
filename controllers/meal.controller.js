import Meal from '../Models/Meal.js';

// Add a meal
export const addMeal = async (req, res) => {
    const { name, price } = req.body;
    try {
        const meal = new Meal({ name, price });
        await meal.save();
        res.status(201).json({ message: 'Meal added successfully', meal });
    } catch (err) {
        res.status(500).json({ error: 'Error adding meal', details: err.message });
    }
};

// Update a meal
export const updateMeal = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const meal = await Meal.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.status(200).json({ message: 'Meal updated successfully', meal });
    } catch (err) {
        res.status(500).json({ error: 'Error updating meal', details: err.message });
    }
};

// Get all meals
export const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching meals', details: err.message });
    }
};

// Delete a meal
export const deleteMeal = async (req, res) => {
    const { id } = req.params;
    try {
        const meal = await Meal.findByIdAndDelete(id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.status(200).json({ message: 'Meal deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting meal', details: err.message });
    }
};
