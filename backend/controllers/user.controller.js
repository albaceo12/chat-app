import User from "../models/users.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.log("error in getUserForSidebar: ", error.message);
    res.status(500).json({ error: "internal server error!!!" });
  }
};
