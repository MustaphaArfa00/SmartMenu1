import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import { CreateError } from './error.js'; // Import the CreateError utility function

// Middleware function to verify the token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Retrieve the token from cookies
  if (!token) {
    return next(CreateError(401, "You are not authenticated!")); // Return error if no token is found
  }
  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(CreateError(403, "Token is not valid")); // Return error if token is not valid
    } else {
      req.user = user; // Attach user information to the request object
    }
    next(); // Call the next middleware or route handler
  });
}

// Middleware function to verify if the user is the owner of the account or an admin
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next(); // If user ID matches the request parameter ID or user is an admin, call the next middleware or route handler
    } else {
      return next(CreateError(403, "You are not authorized!")); // Return error if user is not authorized
    }
  });
}

// Middleware function to verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next(); // If user is an admin, call the next middleware or route handler
    } else {
      return next(CreateError(403, "You are not authorized!")); // Return error if user is not an admin
    }
  });
}
