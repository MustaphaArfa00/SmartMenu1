import mongoose from 'mongoose';

const dessertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export default mongoose.model('Desserts', dessertSchema);
