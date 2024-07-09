import express from 'express'; // Import the Express library
import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions
import dotenv from 'dotenv'; // Import dotenv for environment variables
import roleRoute from './routes/role.js'; // Import routes for roles
import authRoute from './routes/auth.js'; // Import routes for authentication
import userRoute from './routes/user.js'; // Import routes for users
import appetizersRoute from './routes/appetizers.js';
import pastaRoute from './routes/pasta.js';
import pizzaRoute from './routes/pizza.js';
import dessertsRoute from './routes/desserts.js';
import drinksRoute from './routes/drinks.js';
import cookieParser from 'cookie-parser'; // Import cookie-parser for handling cookies
import cors from 'cors'; // Import cors for Cross-Origin Resource Sharing

const app = express(); // Create a new Express application
dotenv.config(); // Load environment variables from .env file

app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(express.json()); // Use express.json middleware for parsing JSON body
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers)
}));

// Routes for different API endpoints
app.use("/api/role", roleRoute); // Route for roles
app.use("/api/auth", authRoute); // Route for authentication
app.use("/api/user", userRoute); // Route for users
app.use("/api/appetizers", appetizersRoute);
app.use("/api/pasta", pastaRoute);
app.use("/api/pizza", pizzaRoute);
app.use("/api/desserts", dessertsRoute);
app.use("/api/drinks", drinksRoute);
app.use('/uploads', express.static('uploads'));
// Response handler middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500; // Get the status code from the response object or default to 500
    const message = obj.message || "Something went wrong!"; // Get the message from the response object or default message
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false, // Determine success based on status code
        status: statusCode, // Send the status code in the response
        message: message, // Send the message in the response
        data: obj.data // Send any data in the response
    });
});

// Function to connect to MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // Connect to MongoDB using the MONGO_URL from environment variables
        console.log("Connected to Database");
    } catch (error) {
        throw error; // Throw any errors that occur during MongoDB connection
    }
}

// Use the roleRoute again, which seems redundant; removed this line
// app.use("/api/role", roleRoute);

// Start the server and listen on port 8800
app.listen(8800, () => {
    connectMongoDB(); // Connect to MongoDB when the server starts
    console.log("Connected to backend");
});
