import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newmessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newmessage) {
      conversation.messages.push(newmessage._id);
    }

    // socket.io;

    Promise.all([await newmessage.save(), await conversation.save()]);
    res.status(201).json({ newmessage });
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ error: "internal server errro!!!" });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const msges = conversation.messages;
    res.status(200).json(msges);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ error: "internal server errro!!!" });
  }
};
