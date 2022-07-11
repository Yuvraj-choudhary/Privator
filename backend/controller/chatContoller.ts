import expressAsyncHandler from "express-async-handler";

const Chat = require("../models/chatModel");
const User = require("../models/userModels");

const accessChat = expressAsyncHandler(async (req: any, res: any) => {
  const { userId } = req.body;

  if (!userId) {
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = expressAsyncHandler(async (req: any, res: any) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results: any) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (err: any) {
    res.status(400);
    throw new Error(err.message);
  }
});

const createGroupChat = expressAsyncHandler(async (req: any, res: any) => {
  if (!req.body.users || !req.body.name) {
    return res.sendStatus(400).message("Missing required fields");
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.sendStatus(400).message("Group chat must have at least 2 users");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      pic: req.body.pic,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err: any) {}
});

const renameGroup = expressAsyncHandler(async (req: any, res: any) => {
  const { chatId, chatName } = req.body;

  const updateChat = await Chat.findOneAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(updateChat);
});

const removeFromGroup = expressAsyncHandler(async (req: any, res: any) => {
  const { chatId, userId } = req.body;

  const updateChat = await Chat.findOneAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(updateChat);
});

const addToGroup = expressAsyncHandler(async (req: any, res: any) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findOneAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(added);
});

const deleteChat = expressAsyncHandler(async (req: any, res: any) => {});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  deleteChat,
};
