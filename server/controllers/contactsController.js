import User from "../models/UserModel.js";

export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ message: "searchTerm is required" });
    }

    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(sanitizedSearchTerm, "i"); 

    const contacts = await User.find({
      _id: { $ne: req.userId },
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
      ],
    }).select("-password"); 

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error searching contacts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
