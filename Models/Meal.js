import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number ,
        required: true
    }
});

export default mongoose.model("Meal",mealSchema)


