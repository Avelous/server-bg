import mongoose from "mongoose";

const investmentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    amount: Number,
    tier: Number,
    startTime: Number,
    endTime: Number,
    active: Boolean,
    expectedProfit: Number,
  },
  { timestamps: true }
);

const Investment = mongoose.model("Investment", investmentSchema);

export default Investment;
