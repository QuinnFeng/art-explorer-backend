import User from "../models/user.js";

export async function getAllUsers(req, res) {
  try {
    // Retrieve all arts from the database
    const users = await User.find({});

    if (!users.length) {
      return res.status(404).json({ message: "No Users found" });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Get a single user by ID
export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json( user );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Update a user by ID
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Delete a user by ID
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const likeArt = async (req, res) => {
  const { id } = req.params; // user id
  const { artId } = req.body; // art id to like

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { likeArt: artId } }, // addToSet avoids duplicates
      { new: true }
    );
    res.status(200).json({ message: `user ${id} liked art ${artId}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to like art", error: error.message });
  }
};

// Remove art from liked list
export const unlikeArt = async (req, res) => {
  const { id } = req.params;
  const { artId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { likeArt: artId } },
      { new: true }
    );
    res.status(200).json({ message: `user ${id} unliked art ${artId}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to unlike art", error: error.message });
  }
};
