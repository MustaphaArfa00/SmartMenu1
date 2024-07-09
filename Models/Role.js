import mongoose from "mongoose";

// Define a schema for the Role model using Mongoose
const RoleSchema = mongoose.Schema(
  {
    // Define a field 'role' with type String and make it required
    role: {
      type: String,
      required: true
    }
  },
  {
    // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields
    timestamps: true
  }
);

// Export the model named "Role" using the defined schema
export default mongoose.model("Role", RoleSchema);
