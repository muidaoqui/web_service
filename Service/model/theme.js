import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  demoUrl: { type: String },
  description: { type: String },
  features: [{ type: String }],
  reasons: [{ type: String }],
  compatibility: {
    browsers: [{ type: String }],
    wordpress: [{ type: String }],
    plugins: [{ type: String }]
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Theme", ThemeSchema);
