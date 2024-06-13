// Function to create an error object
export const CreateError = (error, message) => {
    const err = new Error(); // Create a new Error object
    err.status = error; // Set the status property of the error object
    err.message = message; // Set the message property of the error object
    return err; // Return the error object
}
