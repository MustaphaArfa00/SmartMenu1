// Function to create a success object
export const CreateSuccess = (statusCode, successMessage, data) => {
    const successObj = { // Create a success object
        status: statusCode, // Assign the status code to the 'status' property
        message: successMessage, // Assign the success message to the 'message' property
        data: data // Assign the data to the 'data' property
    };
    return successObj; // Return the success object
}
