import express from 'express'; // Import the Express library
import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js'; // Import role controller functions

const router = express.Router(); // Create a new router instance

// Route to create a new role
// Handles POST requests to '/create' and calls the createRole controller function
router.post('/create', createRole);

// Route to update an existing role
// Handles PUT requests to '/update/:id' and calls the updateRole controller function
// ':id' is a route parameter for the role ID
router.put('/update/:id', updateRole);

// Route to get all roles
// Handles GET requests to '/getAll' and calls the getAllRoles controller function
router.get('/getAll', getAllRoles);

// Route to delete a role
// Handles DELETE requests to '/deleteRole/:id' and calls the deleteRole controller function
// ':id' is a route parameter for the role ID
router.delete('/deleteRole/:id', deleteRole);

// Export the router to be used in other parts of the application
export default router;
