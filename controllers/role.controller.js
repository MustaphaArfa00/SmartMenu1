import Role from '../Models/Role.js'; // Import the Role model
import { CreateError } from '../utils/error.js'; // Import the CreateError utility function
import { CreateSuccess } from '../utils/success.js'; // Import the CreateSuccess utility function

// Function to create a new role
export const createRole = async(req, res, next) => {
    try {
        // Check if the 'role' field is present and not empty in the request body
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body); // Create a new Role instance with the request body
            await newRole.save(); // Save the new role to the database
            return next(CreateSuccess(200, "Role created successfully!")); // Return success response
        } else {
            return next(CreateError(400, "Bad Request")); // Return error if 'role' field is missing or empty
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error")); // Return error for any server issues
    }
}

// Function to update an existing role
export const updateRole = async(req, res, next) => {
    try {
        const role = await Role.findById({_id: req.params.id}); // Find the role by ID
        if(role) {
            // Update the role with the new data from the request body
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).send("Role Updated!"); // Return success response
        } else {
            return res.status(404).send("Role Not Found"); // Return error if role is not found
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error!"); // Return error for any server issues
    }
}

// Function to get all roles
export const getAllRoles = async(req, res, next) => {
    try {
        const roles = await Role.find({}); // Fetch all roles from the database
        return res.status(200).send(roles); // Return the roles
    } catch (error) {
        return res.status(500).send("Internal Server Error!"); // Return error for any server issues
    }
}

// Function to delete a role
export const deleteRole = async(req, res, next) => {
    try {
        const roleId = req.params.id; // Get the role ID from the request parameters
        const role = await Role.findById({_id: roleId}); // Find the role by ID
        if(role) {
            await Role.findByIdAndDelete(roleId); // Delete the role
            return res.status(200).send("Role Deleted"); // Return success response
        }
    } catch(error) {
        return res.status(500).send("Internal Server Error!"); // Return error for any server issues
    }
}
