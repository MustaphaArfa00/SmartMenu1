import User from "../Models/User.js"; // Import the User model
import { CreateError } from '../utils/error.js'; // Import the CreateError utility function
import { CreateSuccess } from '../utils/success.js'; // Import the CreateSuccess utility function

// Function to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    return next(CreateSuccess(200, "All Users", users)); // Return success response with all users
  } catch (error) {
    return next(CreateError(500, "Internal Server Error")); // Return error for any server issues
  }
}

// Function to get a user by ID
export const getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Find the user by ID
    if (!user) {
      return next(CreateError(404, "User Not Found!")); // Return error if user is not found
    }
    return next(CreateSuccess(200, "Single User", user)); // Return success response with the user data
  } catch (error) {
    return next(CreateError(500, "Internal Server Error")); // Return error for any server issues
  }
}
