import mongoose from 'mongoose';

const pastaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Pasta', pastaSchema);
