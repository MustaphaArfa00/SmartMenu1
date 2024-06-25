import mongoose from 'mongoose';

const appetizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Appetizer', appetizerSchema);
