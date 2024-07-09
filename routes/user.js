import express from 'express'; // Import the Express library
import { getAllUsers, getById } from '../controllers/user.controller.js'; // Import the user controller functions
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'; // Import the token verification middleware functions

const router = express.Router(); // Create a new router instance

// Route to get all users
// Handles GET requests to '/' and calls the getAllUsers controller function
// The verifyAdmin middleware ensures that only admin users can access this route
router.get('/', verifyAdmin, getAllUsers);

// Route to get a user by ID
// Handles GET requests to '/:id' and calls the getById controller function
// The verifyUser middleware ensures that only the user with the specified ID or an admin can access this route
router.get('/:id', verifyUser, getById);

// Export the router to be used in other parts of the application
export default router;
