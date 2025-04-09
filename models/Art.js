import { Schema, model } from "mongoose";

const ArtSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  iiif_url: {
    type: String,
    required: true,
  },
});

export default model("Art", ArtSchema);
