const express = require("express");
const chatRoute = express.Router();
const { getUsers } = require("../controller/getAllUsers");
const { upload } = require("../utils/upload");
const profilePic = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "groupPro", maxCount: 1 },
  { name: "fileUpload", maxCount: 1 },
]);
const {
  chatsHandler,
  getPrivateChatHandler,
  updatePrivateChatHandler,
  groupCreateHandler,
  groupGetHandler,
  singleGroupGetHandler,
  getOwnGroupHandler,
  addGroupMemberHandler,
  joinRequestHandler,
  getSingleUser,
  fileSendHandler,
  getPrivateChatHandlerSpecial,
} = require("./../controller/chatController");
//chat route
chatRoute.get("/get/all/users", getUsers);
chatRoute.post("/create/private/chat", chatsHandler);
chatRoute.get("/get/private/chat", getPrivateChatHandler);
chatRoute.post("/get/private/chat/special", getPrivateChatHandlerSpecial);
chatRoute.patch("/update/private/chat", updatePrivateChatHandler);
chatRoute.post("/send/file", profilePic, fileSendHandler);
// chatRoute.get("/get/file", fileGetHandler);
// chatRoute.delete("/delete/file", fileDeleteHandler);
chatRoute.post("/post/group", profilePic, groupCreateHandler);
chatRoute.get("/get/group/data", groupGetHandler);
chatRoute.get("/get/single/group", singleGroupGetHandler);
chatRoute.get("/get/own/group", getOwnGroupHandler);
chatRoute.get("/get/single/user", getSingleUser);
chatRoute.patch("/add/group/member", addGroupMemberHandler);
chatRoute.patch("/join/request", joinRequestHandler);

module.exports = { chatRoute };
