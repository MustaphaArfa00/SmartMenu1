import mongoose, { Schema } from "mongoose"; // Import mongoose and Schema from mongoose

// Define a schema for the User model using Mongoose
const UserSchema = mongoose.Schema(
  {
    // Define a field 'firstName' with type String and make it required
    firstName: {
      type: String,
      required: true
    },

    // Define a field 'lastName' with type String and make it required
    lastName: {
      type: String,
      required: true
    },

    // Define a field 'Email' with type String, make it required, and ensure it is unique
    Email: {
      type: String,
      required: true,
      unique: true
    },

    // Define a field 'Password' with type String and make it required
    Password: {
      type: String,
      required: true
    },

    // Define a field 'isAdmin' with type Boolean and set its default value to false
    isAdmin: {
      type: Boolean,
      default: false
    },

    // Define a field 'roles' as an array of ObjectId references to the Role model, and make it required
    roles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Role"
    }
  },
  {
    // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

// Export the model named "User" using the defined schema
export default mongoose.model("User", UserSchema);
