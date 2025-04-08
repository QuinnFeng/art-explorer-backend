import Art from "../models/Art.js"; // Import Art model

// Create an Art
export async function createArt(req, res) {
  const { title, image, iiif_url } = req.body;

  try {
    const newArt = new Art({ title, image, iiif_url });
    // Save the art entry to the database
    await newArt.save();
    // Respond with the created art
    res.status(201).json({ art: newArt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Get all Arts
export async function getAllArts(req, res) {
  try {
    // Retrieve all arts from the database
    const arts = await Art.find({});

    if (!arts.length) {
      return res.status(404).json({ message: "No arts found" });
    }

    // Respond with the list of arts
    res.status(200).json({ arts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Get an Art by ID
export async function getArtById(req, res) {
  const { id } = req.params;

  try {
    // Find an art entry by its ID
    const art = await Art.findOne({ id });

    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    // Respond with the art details
    res.status(200).json({ art });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Delete an Art by ID
export async function deleteArtById(req, res) {
  const { id } = req.params;

  try {
    // Delete the art by its ID
    const deletedArt = await Art.deleteOne({ id });

    if (!deletedArt.deletedCount) {
      return res.status(404).json({ message: "Art not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Art deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Update an Art by ID
export async function updateArtById(req, res) {
  const { id } = req.params;
  const updatedArtData = req.body;

  try {
    // Find and update the art by its ID
    const updatedArt = await Art.findOneAndUpdate({ id }, updatedArtData, {
      new: true,
    });

    if (!updatedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    // Respond with the updated art
    res.status(200).json({ art: updatedArt });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
