import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**UPDATE */
export const changePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    const user = await User.findById(id);

    const isMatch = oldPassword == user.password;
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Current Password. " });

    user.password = newPassword;
    await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
