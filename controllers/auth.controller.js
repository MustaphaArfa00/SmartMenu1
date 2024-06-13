import Role from "../Models/Role.js"; // Import the Role model
import User from "../Models/User.js"; // Import the User model
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import jwt from "jsonwebtoken"; // Import jwt for generating tokens
import { CreateSuccess } from "../utils/success.js"; // Import CreateSuccess utility function

// Function to register a new user
export const register = async (req, res, next) => {
  // Find the role with the name "User"
  const role = await Role.find({ role: "User" });
  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the user's password
  const hashPassword = await bcrypt.hash(req.body.Password, salt);
  // Create a new User instance with the hashed password and role
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Email: req.body.Email,
    Password: hashPassword,
    roles: role,
  });
  // Save the new user to the database
  await newUser.save();
  // Return success response
  return next(CreateSuccess(200, "User Registered Successfully!"));
};

// Function to register a new admin
export const registerAdmin = async (req, res, next) => {
  // Find all roles
  const role = await Role.find({});
  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the admin's password
  const hashPassword = await bcrypt.hash(req.body.Password, salt);
  // Create a new User instance with the hashed password, isAdmin set to true, and roles
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Email: req.body.Email,
    Password: hashPassword,
    isAdmin: true,
    roles: role,
  });
  // Save the new admin to the database
  await newUser.save();
  // Return success response
  return next(CreateSuccess(200, "Admin Registered Successfully!"));
};

// Function to log in a user
export const login = async (req, res, next) => {
  try {
    // Find the user by email and populate the roles
    const user = await User.findOne({ Email: req.body.Email }).populate("roles", "role");
    const { roles } = user; // Extract roles from the user document
    if (!user) {
      // Return error if user is not found
      return res.status(404).send("User Not Found");
    }
    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(req.body.Password, user.Password);
    if (!isPasswordCorrect) {
      // Return error if password is incorrect
      return res.status(404).send("Password is incorrect!");
    }
    // Generate a JWT token with user id, isAdmin status, and roles
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, roles: roles },
      process.env.JWT_SECRET
    );
    // Set the token in a cookie and return success response
    res.cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        message: "User Logged in successfully",
        data: user
      });
  } catch (error) {
    // Return error for any server issues
    return res.status(500).send("Something went wrong");
  }
};
