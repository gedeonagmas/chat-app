import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import Back from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useChatGetAllUsersQuery,
  useChatGetAllGroupsQuery,
  useChatCreateGroupMutation,
  useGetPrivateChatMutation,
} from "../../features/api/apiSlice";
import PrivateSideVar from "./private/PrivateSideVar";
import GroupSideVar from "./group/GroupSideVar";
import Messages from "./messages/Messages";
import User from "./private/User";
import MessageField from "./messages/MessageField";

const Main = () => {
  const api = "http://localhost:5000/";
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = location.state.user;
  const [userData, setUserData] = useState([]);
  const { data: allUsersData, isFetching: isFetchingUser, isError: isErrorUser } = useChatGetAllUsersQuery();
  let userDataLet;
  if (allUsersData) {
    userDataLet = allUsersData;
  }

  //assign searched data
  useEffect(() => {
    setUserData(userDataLet);
  }, [userDataLet]);

  const [getPrivateChatData, getPrivateChatResponse] = useGetPrivateChatMutation();
  //user search handler
  const userSearchHandler = (val) => {
    userDataLet = allUsersData.filter((u) => u.userName.toLowerCase().includes(val.toLowerCase()));
    setUserData(userDataLet);
  };

  // group search handler
  const [groupsData, setGroupsData] = useState([]);
  const { data: allGroupsDatas, isFetching: isFetchingGroup, isError: isErrorGroup } = useChatGetAllGroupsQuery();
  const [groupDataValues] = useChatCreateGroupMutation();
  let groupDataLet;
  if (allGroupsDatas) {
    groupDataLet = allGroupsDatas;
  }

  //group data for search
  useEffect(() => {
    setGroupsData(groupDataLet);
  }, [groupDataLet]);

  //search handler
  const searchGroupHandler = (val) => {
    groupDataLet = allGroupsDatas.filter((g) => g.groupName.toLowerCase().includes(val.toLowerCase()));
    setGroupsData(groupDataLet);
  };

  // variables
  const [writeMessage, setWriteMessage] = useState(false);
  const [please, setPlease] = useState(false);
  const [wellCome, setWellCome] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [back, setBack] = useState(true);
  const [usersToBeAddedContainer, setUsersToBeAddedContainer] = useState(false);
  const [usersToBeAddedData, setUsersToBeAddedData] = useState(null);
  const [newRequestContainer, setNewRequestContainer] = useState(false);
  const [onlyAddAndRemoveContainer, setOnlyAddAndRemoveContainer] = useState(false);
  const [newRequestData, setNewRequestData] = useState(null);
  const [addAndRemove, setAddAndRemove] = useState(null);
  const [addAndRemoveContainer, setAddAndRemoveContainer] = useState(false);
  const [ownGroupList, setOwnGroupList] = useState(false);
  const [ownGroupData, setOwnGroupData] = useState(null);
  const [ownGroupContainer, setOwnGroupContainer] = useState(false);
  const [manageGroup, setManageGroup] = useState(false);
  const [manageGroupText, setManageGroupText] = useState(false);
  const [joinHope, setJoinHope] = useState(false);
  const [singleGroupData, setSingleGroupData] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [joinFlag, setJoinFlag] = useState(false);
  const [groupProfile, setGroupProfile] = useState("");
  const [fileSendFlag, setFileSendFlag] = useState(false);
  const [fileDescription, setFileDescription] = useState("");
  const [files, setFiles] = useState("");
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [more, setMore] = useState(false);
  const [groupForm, setGroupForm] = useState(false);
  const [firstIds, setFirstId] = useState(null);
  const [secondIds, setSecondId] = useState(null);
  const [groupIds, setGroupIds] = useState(null);
  const [noRequest, setNoRequest] = useState(false);
  const [sayHi, setSayHi] = useState(false);
  const [loading, setLoading] = useState(false);

  //initialize socket io
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  //online users
  useEffect(() => {
    socket?.emit("com", currentUser.userName);
    socket?.on("aaa", (val) => {
      setOnlineUsers(val);
    });
  }, [socket, currentUser]);

  //send data
  const dataSenderHandler = (messages, rooms) => {
    socket?.emit("aa", messages, rooms);
    socket?.on("bb", (text) => {
      setTexts(text);
    });
    setLoading(false);
  };

  // file delete handler
  const fileDeleteHandler = async () => {
    await axios.delete(`http://localhost:5000/delete/file?ids=${chatId}`);
    setFileSendFlag(false);
    setFiles("");
    setFileDescription("");
  };

  // message send patch handler
  const patchHandler = async (data) => {
    if (data) {
      const da = await axios.patch(`http://localhost:5000/update/private/chat?ids=${data.chatId}`, {
        chatOwners: data.chatOwners,
        chatId: data.chatId,
        messages: [
          ...data.messages,
          {
            messageType: "text",
            content: message,
            time: new Date().toISOString(),
            sender: currentUser.userName,
            image: currentUser.profilePicture,
          },
        ],
        chatType: data.chatType,
      });
      if (da.request.status === 200) {
        const data2 = await axios.get(`http://localhost:5000/get/private/chat?ids=${chatId}`);
        setTexts(data2.data[0].messages);
        dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      }
    }
    setMessage("");
  };

  // message send handler
  const [typing, setTyping] = useState(false);
  const messageSendHandler = async () => {
    const data2 = await axios.get(`http://localhost:5000/get/private/chat?ids=${chatId}`);
    if (data2.request.status === 201) {
      patchHandler(data2.data[0]);
    }
    socket?.emit("typing f", false, chatId);
    socket?.on("typing false", (bool) => {
      setTyping(bool);
    });
  };

  // scroll to last message handler
  const refer = useRef(null);
  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [texts]);
  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [typing]);

  // typing handler
  const typingHandler = (e) => {
    if (e.target.value.length > 0) {
      socket?.emit("typing t", true, chatId);
      socket?.on("typing true", (bool) => {
        setTyping(bool);
      });
    } else {
      socket?.emit("typing f", false, chatId);
      socket?.on("typing false", (bool) => {
        setTyping(bool);
      });
    }
  };

  // create room handler helper
  const createRoomHandlerHelper = async (elId, elName, types) => {
    const data = await axios.post("http://localhost:5000/create/private/chat", {
      chatOwners: `${currentUser.userName} and ${elName}`,
      chatId: elId,
      messages: {
        messageType: "text",
        content: "",
        time: new Date().toISOString(),
        sender: currentUser.userName,
        image: currentUser.profilePicture,
      },
      chatType: types,
    });
    if (data.request.status === 201) {
      const data1 = await axios.get(`http://localhost:5000/get/private/chat?ids=${elId}`);
      if (data1.data.length !== 0) {
        if (data1.data[0].messages.length < 2) {
          setSayHi(true);
        } else {
          setSayHi(false);
        }
        setTexts(data1.data[0].messages);
        setChatId(data1.data[0].chatId);
        dataSenderHandler(data1.data[0].messages, data1.data[0].chatId);
      }
    }
  };

  // create room handler
  const createRoomHandler = async (firstId, secondId, elName, type) => {
    setFirstId(firstId);
    setSecondId(secondId);
    const data1 = await axios.get(`http://localhost:5000/get/private/chat?ids=${firstId}`);
    if (data1.data.length === 0) {
      const data2 = await axios.get(`http://localhost:5000/get/private/chat?ids=${secondId}`);
      if (data2.data.length === 0) {
        createRoomHandlerHelper(firstId, elName, type);
      } else {
        if (data2.data[0].messages.length < 2) {
          setSayHi(true);
        } else {
          setSayHi(false);
        }
        setTexts(data2.data[0].messages);
        setChatId(data2.data[0].chatId);
        dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      }
    } else {
      if (data1.data[0].messages.length < 2) {
        setSayHi(true);
      } else {
        setSayHi(false);
      }
      setTexts(data1.data[0].messages);
      dataSenderHandler(data1.data[0].messages, data1.data[0].chatId);
      setChatId(data1.data[0].chatId);
    }
  };

  // private underline handler
  const underlineHandler = async (val) => {
    const data = await axios.get(`http://localhost:5000/get/all/users`);
    let b = [];
    data.data.map((ee, j) => {
      b.push(ee._id);
      if (j === data.data.length - 1) {
        const fu = async () => {
          const data2 = await axios.get("http://localhost:5000/get/group/data");
          data2.data.map((e, i) => {
            b.push(e._id);
            if (i === data2.data.length - 1) {
              b.map((el) => {
                const ids = document.getElementById(el);
                ids?.classList.remove("bg-gray-300");
                if (el === val) {
                  const idd = document.getElementById(val);
                  idd?.classList.add("bg-gray-300");
                }
                return true;
              });
            }
            return true;
          });
        };
        fu();
      }
      return true;
    });
  };

  // file patch handler
  const filePatchHandler = async (messageData, fileData) => {
    const data1 = await axios.patch(`http://localhost:5000/update/private/chat?ids=${messageData.chatId}`, {
      chatOwners: messageData.chatOwners,
      chatId: messageData.chatId,
      messages: [
        ...messageData.messages,
        {
          messageType: fileData.messageType,
          fileDescription: fileData.fileDescription,
          chatId: fileData.chatId,
          fileName: fileData.fileName,
          path: fileData.path,
          sender: fileData.sender,
          size: fileData.size,
          time: fileData.time,
          type: fileData.type,
          image: currentUser.profilePicture,
        },
      ],
      chatType: messageData.chatType,
    });
    if (data1.request.status === 200) {
      const data2 = await axios.get(`http://localhost:5000/get/private/chat?ids=${chatId}`);
      if (data2.data[0].messages.length < 2) {
        setSayHi(true);
      } else {
        setSayHi(false);
      }
      setTexts(data2.data[0].messages);
      dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      fileDeleteHandler();
    }
  };

  // file get handler
  const fileGetHandler = async () => {
    const fileData = await axios.get(`http://127.0.0.1:5000/get/file?ids=${chatId}`);
    if (fileData.data.length !== 0) {
      const data1 = await axios.get(`http://127.0.0.1:5000/get/private/chat?ids=${firstIds}`);
      if (data1.request.status === 201 && data1.data.length !== 0) {
        filePatchHandler(data1.data[0], fileData.data[0]);
      } else {
        const data2 = await axios.get(`http://127.0.0.1:5000/get/private/chat?ids=${secondIds}`);
        if (data2.request.status === 201 && data2.data.length !== 0) {
          filePatchHandler(data2.data[0], fileData.data[0]);
        } else {
          console.log("please first create chat room");
        }
      }
    }
  };

  // file post handler
  const fileHandler = async () => {
    if (files) {
      const fd = new FormData();
      console.log(files, "llllllllllldddddd");
      fd.append("fileUpload", files);
      fd.append("messageType", "file");
      fd.append("fileDescription", fileDescription);
      fd.append("time", new Date().toISOString());
      fd.append("sender", currentUser.userName);
      fd.append("chatId", chatId);
      fd.append("image", currentUser.profilePicture);
      const data = await axios.post("http://localhost:5000/send/file", fd);
      if (data.request.status === 200) {
        const data2 = await axios.get(`http://localhost:5000/get/private/chat?ids=${chatId}`);
        setTexts(data2.data[0].messages);
        dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      }
      setFiles("");
    }
  };

  // group create handler
  const groupCreateHandler = async () => {
    const fd = new FormData();
    fd.append("groupName", groupName);
    fd.append("flag", "groups");
    fd.append("groupPro", groupProfile);
    fd.append("ownersName", currentUser.userName);
    fd.append("ownersId", currentUser._id);
    fd.append("members", currentUser._id);
    fd.append("requests", []);
    groupDataValues(fd);
    setGroupProfile("");
    setGroupName("");
    setGroupForm(false);
  };

  // group room create handler
  const groupJoinHandler = async (groupId, groupName, groups) => {
    const data = await axios.get(`http://localhost:5000/get/single/group?ids=${groupId}`);
    if (data.data.length !== 0 && data.request.status === 200) {
      setOwnGroupData(data.data);
      setNewRequestData(data.data[0].requests);
      setSingleGroupData(data.data);
      if (data.data[0].ownersId === currentUser._id) {
        setManageGroup(true);
      } else {
        setManageGroup(false);
      }
      if (data.data[0].members.includes(currentUser._id)) {
        createRoomHandler(groupId, groupId, groupName, groups);
        setJoinFlag(false);
      } else {
        setJoinFlag(true);
        setSayHi(false);
      }
    }
  };

  // join handler
  const joinHandler = async () => {
    socket?.emit("cc1", false);
    socket?.on("cc2", (val) => {
      setJoinHope(val);
    });
    const data = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    const b = data.data[0].requests;
    const a = currentUser._id;
    if (b.includes(a)) {
      socket?.emit("cc1", true);
      socket?.on("cc2", (val) => {
        setJoinHope(val);
      });
    } else {
      let filterdIds = b.concat(a);
      const data1 = await axios.patch(`http://localhost:5000/join/request?ids=${groupIds}`, {
        requests: filterdIds,
      });
      if (data1.request.status === 200) {
        setJoinHope(true);
        const data2 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
        newRequestDataSetHandler(data2.data);
        afterCancel();
      }
    }
  };

  // group member add and remove handler
  const groupMemberAddAndRemoveHandler = async (el) => {
    setOnlyAddAndRemoveContainer(true);
    const data2 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    const members = ownGroupData[0]?.members;
    setOwnGroupList(false);
    let arr = [];
    members?.map((els) => {
      const func = async () => {
        const data = await axios.get(`http://localhost:5000/get/single/user?ids=${els}`);
        arr.push(data.data[0]);
        if (arr.length === members.length) {
          setAddAndRemove(arr);
        }
      };
      func();
      return true;
    });
    setAddAndRemoveContainer(true);
  };

  // new request data set handler
  const newRequestDataSetHandler = async (el) => {
    const requests = el[0].requests;
    let arr = [];
    if (requests.length === 0) {
      socket?.emit("bb1", arr);
      socket?.on("bb2", (val) => {
        setNewRequestData(val);
      });
    } else {
      socket?.emit("bb1", false);
      socket?.on("bb2", (val) => {
        setNoRequest(val);
      });
      requests.map((els, i) => {
        const func = async () => {
          const data = await axios.get(`http://localhost:5000/get/single/user?ids=${els}`);
          arr.push(data.data[0]);
          if (i === requests.length - 1) {
            setNewRequestData(arr);
            socket?.emit("a1", arr);
            socket?.on("a2", (val) => {
              setNewRequestData(val);
            });
          }
        };
        func();
        return true;
      });
    }
  };

  // after cancel
  const afterCancel = async () => {
    const data = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    setOwnGroupData(data.data);
  };

  // after delete fetch data for total users and add members
  const fetchForAllMembersAfterDelete = async () => {
    const data1 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    if (data1.request.status === 200 && data1.data.length !== 0) {
      setOwnGroupData(data1.data);
      let bb = [];
      data1.data[0].members.map((aa, i) => {
        const func = async () => {
          const data4 = await axios.get(`http://localhost:5000/get/single/user?ids=${aa}`);
          if (data4.data.length !== 0 && data4.request.status === 200) {
            bb.push(data4.data[0]);
            if (i === data1.data[0].members.length - 1) {
              setAddAndRemove(bb);
              socket?.emit("sen bbbb", bb);
              socket?.on("rec bbbb", (val) => {
                setAddAndRemove(val);
              });
            }
            return bb;
          }
        };
        func();
        return bb;
      });
    }
  };

  // after delete fetch data for add members
  const fetchForAddMembersAfterDelete = async () => {
    const data1 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    let idContainer = [];
    const data = await axios.get("http://localhost:5000/get/all/users");
    data.data.map((e, i) => {
      idContainer.push(e._id);
      if (i === data.data.length - 1) {
        const ids = idContainer.filter((o) => data1.data[0].members.indexOf(o) === -1);
        let aaa = [];
        ids.map((ee, i) => {
          const func = async () => {
            const data4 = await axios.get(`http://localhost:5000/get/single/user?ids=${ee}`);
            if (data4.data.length !== 0 && data4.request.status === 200) {
              aaa.push(data4.data[0]);
              if (i === ids.length - 1) {
                setUsersToBeAddedData(aaa);
                socket?.emit("sen aaaa", aaa);
                socket?.on("rec aaaa", (val) => {
                  setUsersToBeAddedData(val);
                });
              }
              return aaa;
            }
          };
          func();
          return true;
        });
      }
      return idContainer;
    });
  };

  // delete user from group handler
  const deleteUserFromGroupHandler = async (ids) => {
    const currentMembers = ownGroupData[0].members;
    const idsToBeRemoved = ids;
    const filterdIds = currentMembers.filter((o) => idsToBeRemoved.indexOf(o) === -1);
    const data = await axios.patch(`http://localhost:5000/add/group/member?ids=${groupIds}`, {
      members: filterdIds,
    });
    if (data.request.status === 200) {
      fetchForAllMembersAfterDelete();
      fetchForAddMembersAfterDelete();
    }
  };

  //add members handler
  const addMembersHandler = async (el) => {
    const data = await axios.get("http://localhost:5000/get/all/users");
    if (data.data.length !== 0 && data.request.status === 200) {
      const allUser = data.data;
      const members = ownGroupData[0].members;
      let all = [];
      allUser?.map((e, i) => {
        all.push(e._id);
        if (i === allUser.length - 1) {
          const arr1 = all;
          const arr2 = members;
          let unique1 = arr1.filter((o) => arr2.indexOf(o) === -1);
          let aaa = [];
          unique1.map((ee, i) => {
            const func = async () => {
              const data4 = await axios.get(`http://localhost:5000/get/single/user?ids=${ee}`);
              if (data4.data.length !== 0 && data4.request.status === 200) {
                aaa.push(data4.data[0]);
                if (i === unique1.length - 1) {
                  setUsersToBeAddedData(aaa);
                }
                return aaa;
              }
            };
            func();
            return true;
          });
        }
        return all;
      });
    }
  };

  // add users to group handler
  const addUsersToGroupHandler = async (val) => {
    const data = await axios.patch(`http://localhost:5000/add/group/member?ids=${groupIds}`, {
      members: [...ownGroupData[0].members, val],
    });
    if (data.data.length !== 0 && data.request.status === 200) {
      fetchForAddMembersAfterDelete();
      fetchForAllMembersAfterDelete();
    }
  };

  // request accept handler
  const requestAcceptHandler = async (val) => {
    const data1 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    if (data1.data.length !== 0 && data1.request.status === 200) {
      const acceptedIds = val;
      const currentIds = data1.data[0].requests;
      const filterdIds = currentIds.filter((el) => el !== acceptedIds);
      const data2 = await axios.patch(`http://localhost:5000/join/request?ids=${groupIds}`, {
        requests: filterdIds,
      });
      if (data2.request.status === 200) {
        addUsersToGroupHandler(val);
        const data3 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
        newRequestDataSetHandler(data3.data);
      }
    }
  };

  //request reject handler
  const requestRejectHandler = async (val) => {
    const data1 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
    if (data1.request.status === 200 && data1.data.length !== 0) {
      const currentIds = data1.data[0].requests;
      const removedIds = val;
      const filterdIds = currentIds.filter((el) => el !== removedIds);
      const data2 = await axios.patch(`http://localhost:5000/join/request?ids=${groupIds}`, {
        requests: filterdIds,
      });
      if (data2.request.status === 200) {
        const data3 = await axios.get(`http://localhost:5000/get/single/group?ids=${groupIds}`);
        newRequestDataSetHandler(data3.data);
        setJoinHope(false);
      }
    }
  };

  //private side var props
  const privateSideVarProps = {
    userSearchHandler,
    userData,
    currentUser,
    underlineHandler,
    createRoomHandler,
    setWellCome,
    setPlease,
    please,
    setJoinFlag,
    setManageGroup,
    setWriteMessage,
    api,
    onlineUsers,
    isFetchingUser,
    isErrorUser,
  };

  //group side var props
  const groupSideVarProps = {
    searchGroupHandler,
    groupsData,
    setCurrentGroup,
    underlineHandler,
    setGroupIds,
    groupJoinHandler,
    setWellCome,
    setPlease,
    please,
    setWriteMessage,
    api,
    isFetchingGroup,
    isErrorGroup,
  };

  //message props
  const messageProps = {
    wellCome,
    sayHi,
    writeMessage,
    texts,
    typing,
    currentUser,
    api,
    refer,
    loading,
    setLoading,
  };

  //user props
  const userProps = {
    api,
    currentUser,
    setMore,
    setGroupForm,
    more,
    manageGroup,
    newRequestData,
    setOwnGroupContainer,
    setOwnGroupList,
    setAddAndRemoveContainer,
    setManageGroupText,
    manageGroupText,
    ownGroupContainer,
    setUsersToBeAddedContainer,
    usersToBeAddedContainer,
    setNewRequestContainer,
    ownGroupList,
    currentGroup,
    setUsersToBeAddedData,
    usersToBeAddedData,
    groupMemberAddAndRemoveHandler,
    newRequestDataSetHandler,
    setOnlyAddAndRemoveContainer,
    onlyAddAndRemoveContainer,
    afterCancel,
    addAndRemoveContainer,
    addAndRemove,
    deleteUserFromGroupHandler,
    ownGroupData,
    addUsersToGroupHandler,
    setBack,
    back,
    newRequestContainer,
    requestAcceptHandler,
    requestRejectHandler,
    noRequest,
    groupForm,
    joinHandler,
    joinHope,
    joinFlag,
    singleGroupData,
    setGroupName,
    setGroupProfile,
    addMembersHandler,
    groupCreateHandler,
  };

  //message field props
  const messageFieldProps = {
    wellCome,
    setFileSendFlag,
    setPlease,
    please,
    fileSendFlag,
    setFileDescription,
    setFiles,
    files,
    fileHandler,
    setWriteMessage,
    setMessage,
    typingHandler,
    setSayHi,
    messageSendHandler,
    loading,
    setLoading,
  };
  //##################################################### DOM #########################################
  //###################################################################################################
  return (
    <div className="fixed top-0 bg-white w-screen left-0">
      <div className="absolute bg-slate-100 w-[100%] left-[0%] flex place-items-center top-0">
        {/* private chat side var */}
        <PrivateSideVar props={privateSideVarProps} />
        <div className="h-[100vh] flex-[68%] mt-3 lg:-mt-32 relative w-[100%] flex flex-col justify-center items-center">
          <User props={userProps} />
          <Messages props={messageProps} />
          <MessageField props={messageFieldProps} />
        </div>
        <GroupSideVar props={groupSideVarProps} />
      </div>
    </div>
  );
};

export default Main;
