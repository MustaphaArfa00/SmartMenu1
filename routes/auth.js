import express from 'express'; // Import the Express library
import { register, login, registerAdmin, adminLogin } from '../controllers/auth.controller.js'; // Import the authentication controller functions

const router = express.Router(); // Create a new router instance

// Route to register a new user
// Handles POST requests to '/register' and calls the register controller function
router.post("/register", register);

// Route to log in a user
// Handles POST requests to '/login' and calls the login controller function
router.post("/login", login);

// Route to register a new admin
// Handles POST requests to '/register-admin' and calls the registerAdmin controller function
router.post("/register-admin", registerAdmin);


router.post("/login-admin", adminLogin);
// Export the router to be used in other parts of the application
export default router;
