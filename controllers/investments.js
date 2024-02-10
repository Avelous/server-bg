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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { balance: user.balance - amount },
      { new: true }
    );
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

    const updatedInvestment = await Investment.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );

    // res.status(200).json(updatedInvestment);
    const allInvestment = await Investment.find();

    const user = await User.findById(userId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { balance: user.balance + investment.amount + investment.profit },
      { earnings: user.earnings + investment.profit },
      { new: true }
    );
    
    res.status(200).json(allInvestment);

    // res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
