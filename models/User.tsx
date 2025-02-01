import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Check if the model is already compiled to prevent overwrite errors
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
