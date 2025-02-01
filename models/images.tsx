import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  image_name: { type: String, required: true },
});

// Check if the model is already compiled to prevent overwrite errors
const Images = mongoose.models.Images || mongoose.model('Images', imageSchema);

export default Images;
