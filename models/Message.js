import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
