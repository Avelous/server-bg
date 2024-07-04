import Investment from "../models/Investment.js";
import User from "../models/User.js";

/* CREATE */
export const createInvestmentFromBalance = async (req, res) => {
  try {
    const { userId, amount, tier, startTime, endTime, expectedProfit } =
      req.body;
    const user = await User.findById(userId);
    const newInvestment = new Investment({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      amount,
      tier,
      startTime,
      endTime,
      active: true,
      expectedProfit,
    });
    await newInvestment.save();
    const investment = await Investment.find();

    user.balance = user.balance - amount;
    await user.save();

    res.status(201).json(investment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getUserInvestments = async (req, res) => {
  try {
    const { userId } = req.params;
    const investment = await Investment.find({ userId });
    res.status(200).json(investment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getInvestments = async (req, res) => {
  try {
    const investment = await Investment.find();
    res.status(200).json(investment);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const endInvestment = async (req, res) => {
  try {
    const { id, userId } = req.body;
    const investment = await Investment.findById(id);

    console.log(investment.active)
    if (investment.active == false) {
      return res.status(404).json({ message: "Investment already ended" });
    }

    investment.active = false;
    await investment.save();

    const allInvestment = await Investment.find();

    const user = await User.findById(userId);

    user.balance = user.balance + investment.amount + investment.expectedProfit;
    user.earnings = user.earnings + investment.expectedProfit;
    await user.save();
    console.log(user.balance);
    res.status(200).json(allInvestment);

    // res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
