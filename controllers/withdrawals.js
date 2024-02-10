import Withdrawal from "../models/Withdrawal.js";
import User from "../models/User.js";

/* READ */
export const getWithdrawals = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.find();
    res.status(200).json(withdrawal);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

/* CREATE */
export const createWithdrawal = async (req, res) => {
  try {
    const { userId, amount, wallet, time } = req.body;
    const user = await User.findById(userId);
    const newWithdrawal = new Withdrawal({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      amount,
      wallet,
      status: "proccessing",
      time,
    });
    await newWithdrawal.save();
    const withdrawal = await Withdrawal.find();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        balance: user.balance - amount,
        withdrawals: parseFloat(user.withdrawals) + parseFloat(amount),
      },
      { new: true }
    );
    await res.status(201).json(withdrawal);
  } catch (err) {
    console.log(`error: ${err}`);
    res.status(409).json({ message: err.message });
  }
};
