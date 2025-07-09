import { Message } from "../models/message.model.js";

export const getMessages = async(req,res)=>{
    try {
        const id = req.params.id
        const messages = await Message.find({
            $or: [{sender: req.user._id, receiver: id},
                  {sender: id, receiver: req.user._id}
            ]
        })
        res.json(messages)
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    if (!receiver || !content) {
      return res
        .status(400)
        .json({ msg: "Receiver and message content are required." });
    }
    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content,
    });
    res.status(201).json(message);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ msg: "Failed to send message." });
  }
};
  