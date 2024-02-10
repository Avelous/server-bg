import Message from "../models/Message.js";

/* READ */
export const getMessages = async (req, res) => {
    try {
      const message = await Message.find();
      res.status(200).json(message);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: err.message });
    }
  };