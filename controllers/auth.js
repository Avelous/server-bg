import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  sendBlueEmail,
  sendRegistered,
} from "../emailControllers/sendiInBlue.js";
import { sendLoggedin, sendVerifySuccess } from "../emailControllers/email.js";

function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000; // Generates a random number between 100000 and 999999
  return randomNumber; // Converts the number to a string
}

// const msg = {
//   // to: email,
//   from: "your@email.com",
//   subject: "Verify your account",
//   text: `Your verifyOtp is: ${verifyOtp}`,
// };

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, occupation } =
      req.body;

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ msg: "User already exists. Please Login " });

    const verifyOtp = generateRandomNumber();
    // send email

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      balance: 0,
      earnings: 0,
      withdrawals: 0,
      location,
      occupation,
      verified: false,
      verifyOtp: verifyOtp,
    });
    const savedUser = await newUser.save();
    delete savedUser.password;
    await sendRegistered(
      `PRIMEPILOTS ACCOUNT CREATION SUCCESS`,
      firstName,
      verifyOtp,
      `${email}`
    );
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password == user.password;
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const isVerified = user.verified;
    if (!isVerified)
      return res.status(400).json({ msg: "User not verified. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    const date = new Date();
    const utcDate = date.toUTCString();
    await sendLoggedin(`LOGIN SUCCESS NOTIFICATION`, utcDate, `${user.email}`);
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { id, verifyOtp } = req.body;
    const user = await User.findById(id);

    const isMatch = verifyOtp == user.verifyOtp;
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Verification Code. " });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { verified: true, verifyOtp: null },
      { new: true }
    );
    await sendVerifySuccess(
      `PRIMEPILOTS VERIFICATION SUCCESS`,
      user.firstName,
      `${user.email}`
    );
    res.status(400).json({ msg: "Account Verified. Please Login" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const verifyUserWithEmail = async (req, res) => {
  try {
    const { email, verifyOtp } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user.verifyOtp);
    const isMatch = verifyOtp == user.verifyOtp;
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Verification Code. " });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { verified: true, verifyOtp: null },
      { new: true }
    );
    await sendVerifySuccess(
      `PRIMEPILOTS VERIFICATION SUCCESS`,
      user.firstName,
      `${user.email}`
    );
    res.status(400).json({ msg: "Account Verified. Please Login" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const requestOtpWithEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // const isMatch = await bcrypt.compare(password, user.password);

    const isVerified = user.verified;
    if (isVerified)
      return res.status(400).json({ msg: "User already verified. " });

    //  sendBlueEmail
    await sendRegistered(
      `VERIFICATION CODE`,
      user.firstName,
      user.verifyOtp,
      `${user.email}`
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
