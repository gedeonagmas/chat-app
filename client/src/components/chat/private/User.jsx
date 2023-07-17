import Close from "@mui/icons-material/Close";
import React, { useContext } from "react";
import Add from "@mui/icons-material/Add";
import PortraitOutlined from "@mui/icons-material/ManageAccounts";
import Done from "@mui/icons-material/Done";
import QuestionMark from "@mui/icons-material/QuestionMark";
import Badge from "@mui/material/Badge";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Back from "@mui/icons-material/ArrowBack";
import Menu from "@mui/icons-material/Menu";
import { useState } from "react";
import MoreHoriz from "@mui/icons-material/AddBox";
import Logout from "@mui/icons-material/PowerSettingsNew";
import People from "@mui/icons-material/Diversity3";
import Person from "@mui/icons-material/Person2";
import { navContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const User = ({ props }) => {
  const context = useContext(navContext);
  const nav = useNavigate();

  const [more, setMore] = useState(false);
  const [logoutText, setLogoutText] = useState(false);
  const [navigatePrivateText, setNavigatePrivateText] = useState(false);
  const [navigateGroupText, setNavigateGroupText] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const groupNavSmallHandler = () => {
    context.setGroupNavigateSmall(true);
  };

  const privateNavSmallHandler = () => {
    context.setPrivateNavigateSmall(true);
  };

  return (
    <div className="flex -mt-12 py-1 w-[100%]  h-auto items-center justify-between">
      <div className="flex items-center justify-between gap-2 flex-[100%]">
        <div
          onClick={privateNavSmallHandler}
          onMouseOver={() => setNavigatePrivateText(true)}
          onMouseLeave={() => setNavigatePrivateText(false)}
          className="relative lg:hidden text-gray-500 hover:text-black  flex flex-col items-center justify-center cursor-pointer"
        >
          <Person className="" fontSize="small" />
          {navigatePrivateText && (
            <p className="absolute font-bold z-20 top-12 left-1 text-xs text-black w-28 px-[6px] py-2 bg-white border border-gray-300 shadow-lg shadow-black">
              Navigate Users
            </p>
          )}
        </div>
        <div
          onClick={() => {
            nav("/");
          }}
          className="flex relative gap-2 mr-2 items-center justify-center font-bold hover:text-gray-800 text-xs text-gray-500 cursor-pointer"
          onMouseOver={() => setLogoutText(true)}
          onMouseLeave={() => setLogoutText(false)}
        >
          {" "}
          <Logout fontSize="small" className="" />
          {logoutText && (
            <p className="absolute z-30 top-12 text-xs text-black w-16  px-2 py-2 bg-white border border-gray-300 shadow-lg shadow-black">
              Log out
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <img
            src={`${props.api + props.currentUser.profilePicture}`}
            className="h-8 w-8 md:h-11 md:w-11 mt-[3px] object-cover rounded-full"
            alt="pro"
          />{" "}
          <div className="text-xs flex flex-col gap-1 md:text-sm font-bold mt-[3px]">
            <p className="">{props.currentUser.userName}</p>
            <p className="font-semibold text-[#00aeff]">online</p>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <MoreHoriz
            fontSize="small"
            onClick={() => {
              props.setMore(false);
              props.setGroupForm(true);
            }}
            onMouseOver={(e) => setMore(true)}
            onMouseLeave={(e) => setMore(false)}
            className="cursor-pointer text-gray-500 hover:text-black"
          />
          {more && (
            <p className="absolute font-bold z-30 top-12 text-xs w-24 px-[6px] py-2 bg-white border border-gray-300 shadow-lg shadow-black">
              Create Group
            </p>
          )}
        </div>

        <div className="relative flex flex-col items-center justify-center">
          {props.manageGroup && (
            <div className="flex gap-2">
              <Badge badgeContent={props.newRequestData.length} color="secondary" className="text-red-400">
                <PortraitOutlined
                  fontSize="small"
                  onClick={() => {
                    props.setOwnGroupContainer(true);
                    props.setOwnGroupList(true);
                    props.setAddAndRemoveContainer(false);
                  }}
                  onMouseLeave={() => props.setManageGroupText(false)}
                  onMouseOver={() => props.setManageGroupText(true)}
                  className="cursor-pointer text-gray-500 hover:text-black"
                />
              </Badge>
            </div>
          )}
          {props.manageGroupText && (
            <p className="absolute font-bold z-30 top-12 text-xs w-28 px-[6px] py-2 bg-white border border-gray-300 shadow-lg shadow-black">
              Manage Group
            </p>
          )}
        </div>

        <div
          onClick={groupNavSmallHandler}
          onMouseOver={() => setNavigateGroupText(true)}
          onMouseLeave={() => setNavigateGroupText(false)}
          className="relative flex lg:hidden flex-col items-center justify-center"
        >
          <People fontSize="small" className="cursor-pointer text-gray-500 hover:text-black" />
          {navigateGroupText && (
            <p className="absolute z-30 font-bold top-12 right-1 text-xs text-black w-28 px-[6px] py-2 bg-white border border-gray-300 shadow-lg shadow-black">
              Navigate Groups
            </p>
          )}
        </div>
      </div>

      {/* ###################### join group flag ################### */}
      {props.joinFlag && (
        <div className="absolute bg-white z-20 left-[2px] top-[56px] items-center flex flex-col r h-[81%] place-items-center justify-center w-[99.5%]">
          {props.singleGroupData &&
            props.singleGroupData.map((el, i) => {
              return (
                <div className="flex flex-col place-items-center text-gray-500" key={el.members[i]}>
                  <img
                    src={`${props.api + el.groupPro}`}
                    className="h-72 w-72 rounded-full mt-[6px] object-cover"
                    alt="pro"
                  />
                  <p className="text-sm font-bold mx-2">
                    Group Name: <span className="text-[#00aeff] font-extrabold">{el.groupName}</span>
                  </p>
                  <p className="text-sm font-bold">
                    Admin: <span className="text-[#00aeff] font-extrabold">{el.ownersName}</span>
                  </p>
                  <div className="flex mx-2 my-2 gap-2 mt-4">
                    <button
                      onClick={props.joinHandler}
                      className="px-[90px] bg-[#00aeff] rounded-sm hover:text-gray-200 text-white font-bold"
                    >
                      Join
                    </button>
                  </div>
                  {props.joinHope && (
                    <div className="absolute z-50 bottom-[50px] bg-white py-1 w-60 flex items-center text-gray-500 font-bold mt-2">
                      You will join the chat one's the admin approves you thanks.
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* ######################### manage group ############################### */}
      {props.ownGroupContainer && (
        <div className="absolute rounded-sm z-10 w-[100%] h-[100%] flex flex-col justify-center items-center bg-white  border border-gray-300 right-0 top-0 gap-1">
          <Close
            className="absolute hover:text-black text-gray-500 cursor-pointer right-0 top-1"
            fontSize="small"
            onClick={() => {
              props.setOwnGroupContainer(false);
              props.setOwnGroupList(false);
              props.setUsersToBeAddedContainer(false);
              props.setNewRequestContainer(false);
            }}
          />
          <div className="flex flex-col w-[100%] h-[100%] my-2 text-gray-500">
            {props.ownGroupList && (
              <div className="flex flex-col w-[100%] h-[100%] items-center justify-center">
                <p className="text-sm lg:text-xl my-1 text-gray-600 underline font-bold lg:font-extrabold">
                  Group Name : <span className="text-[#00aeff]">{props.currentGroup.groupName}</span>
                </p>
                <img
                  src={`${props.api + props.currentGroup.groupPro}`}
                  alt="group"
                  className="h-[70%] w-[70%] rounded-sm mt-1"
                />{" "}
                <p className="font-bold mt-1 text-gray-500 text-sm">
                  Group Owner : <span className="font-bold text-[#00aeff]">{props.currentGroup.ownersName}</span>
                </p>
                <button
                  onClick={() => {
                    props.groupMemberAddAndRemoveHandler();
                    props.newRequestDataSetHandler(props.ownGroupData);
                    props.setOnlyAddAndRemoveContainer(true);
                    props.afterCancel();
                  }}
                  className="text-sm mt-4 hover:bg-[#00aeff] font-bold text-white bg-[#00aeff] w-[70%] py-3"
                >
                  More Options
                </button>
              </div>
            )}

            {props.addAndRemoveContainer && (
              <div className="flex flex-col bg-white h-[100%] w-[100%] mt-6 items-center justify-center">
                {props.back && (
                  <Back
                    id="back"
                    fontSize="small"
                    onClick={() => {
                      props.setAddAndRemoveContainer(false);
                      props.setNewRequestContainer(false);
                      props.setOwnGroupList(true);
                      props.afterCancel();
                    }}
                    className="absolute hover:text-black text-gray-500 cursor-pointer left-0 top-1"
                  />
                )}

                <div className="flex relative items-center justify-center gap-4 w-[90%] px-4 mt-4 bg-white">
                  <p
                    id="total"
                    onClick={() => {
                      const ids = document.getElementById("request");
                      ids.classList.remove("border-b-[3px]", "border-[#00aeff]");
                      const idd = document.getElementById("total");
                      idd.classList.add("border-b-[3px]", "border-[#00aeff]");
                      props.setOnlyAddAndRemoveContainer(true);
                      props.setNewRequestContainer(false);
                    }}
                    className="text-sm border-b-[3px] border-[#00aeff] h-7 cursor-pointer font-bold my-2"
                  >
                    Total Members
                  </p>
                  <p
                    id="request"
                    onClick={() => {
                      const ids = document.getElementById("total");
                      ids.classList.remove("border-b-[3px]", "border-[#00aeff]");
                      const idd = document.getElementById("request");
                      idd.classList.add("border-b-[3px]", "border-[#00aeff]");
                      props.setOnlyAddAndRemoveContainer(false);
                      props.setNewRequestContainer(true);
                    }}
                    className="text-sm h-7 cursor-pointer font-bold my-2"
                  >
                    New Request{" "}
                    <span className="">
                      <Badge badgeContent={props.newRequestData.length} color="secondary" className="text-red-400">
                        <QuestionMark className="" fontSize="small" />
                      </Badge>
                    </span>
                  </p>
                </div>

                {props.onlyAddAndRemoveContainer && (
                  <div className="bg-white items-center justify-center py-4 w-[98%] h-[90%]">
                    <p className="mx-5 text-xs md:text-sm">
                      to remove members press <span className="text-red-600 font-bold">x</span>
                    </p>
                    <div className="h-[80%] w-[98%] items-center justify-center overflow-y-scroll ml-2">
                      {props.addAndRemove &&
                        props.addAndRemove.map((el, i) => {
                          return (
                            <div
                              key={el._id}
                              className="flex w-[95%] h-[25%] mr-2 justify-between items-center mt-1  cursor-default hover:bg-gray-200 px-2 py-1"
                            >
                              <img
                                src={`${props.api + el.profilePicture}`}
                                alt="user"
                                className="h-[100%] w-[25%] object-cover rounded-sm"
                              />
                              <div className="flex items-center h-[100%] justify-between w-[70%]">
                                <div className="ml-2 flex flex-col justify-start text-lg">
                                  <p className="text-xs md:text-sm text-gray-600 font-bold w-auto px-2 py-1">
                                    full name:{" "}
                                    <span className="text-gray-500 font-normal">
                                      {el.firstName + " " + el.lastName}
                                    </span>
                                  </p>
                                  <p className="text-xs md:text-sm text-gray-600 font-bold w-auto px-2 py-1">
                                    user name: <span className="text-gray-500 font-normal">{el.userName}</span>
                                  </p>
                                  <p className="text-xs text-gray-600 font-bold w-auto">
                                    email: <span className="text-gray-500 font-normal">{el.email}</span>
                                  </p>
                                </div>
                                {props.ownGroupData[0]?.ownersName === el.userName && (
                                  <p className="mt-3 text-xs text-red-600 -ml-3 w-4 h-4">admin</p>
                                )}
                                {props.ownGroupData[0]?.ownersName !== el.userName && (
                                  <Close
                                    onClick={() => props.deleteUserFromGroupHandler(el._id)}
                                    fontSize="small"
                                    className="mt-3 hover:bg-gray-400 text-red-600 w-4 cursor-pointer"
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <button
                      onClick={() => {
                        props.setBack(false);
                        props.setUsersToBeAddedContainer(true);
                        props.addMembersHandler();
                      }}
                      className="bg-[#00aeff] mt-4 hover:bg-[#00aeff] ml-4 absolute text-white w-[80%] py-3 text-sm"
                    >
                      Add Member
                    </button>
                    {props.usersToBeAddedContainer && (
                      <div className="bg-white items-center absolute top-2 justify-center py-4 w-[98%] h-[87%]">
                        <div className="bg-white overflow-y-scroll h-[100%] w-[98%] mt-1">
                          {props.usersToBeAddedData &&
                            props.usersToBeAddedData.map((el) => {
                              return (
                                <div
                                  key={el._id}
                                  className="flex w-[95%] h-[25%] mr-2 justify-between items-center mt-1  cursor-default hover:bg-gray-200 px-2 py-1"
                                >
                                  <img
                                    src={`${props.api + el.profilePicture}`}
                                    alt="user"
                                    className="h-[100%] w-[25%] object-cover rounded-sm"
                                  />
                                  <div className="flex items-center h-[100%] justify-between w-[70%]">
                                    <div className="ml-2 flex flex-col justify-start text-lg">
                                      <p className="text-xs md:text-sm text-gray-600 font-bold w-auto px-2 py-1">
                                        full name:{" "}
                                        <span className="text-gray-500 font-normal">
                                          {el.firstName + " " + el.lastName}
                                        </span>
                                      </p>
                                      <p className="text-xs md:text-sm text-gray-600 font-bold w-auto px-2 py-1">
                                        user name: <span className="text-gray-500 font-normal">{el.userName}</span>
                                      </p>
                                      <p className="text-xs md:text-sm text-gray-600 font-bold w-auto px-2 py-1">
                                        email: <span className="text-gray-500 font-normal">{el.email}</span>
                                      </p>
                                    </div>
                                    <Add
                                      onClick={() => props.addUsersToGroupHandler(el._id)}
                                      fontSize="small"
                                      className="mt-3 hover:bg-gray-400 text-[#00aeff] cursor-pointer"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        <button
                          onClick={() => {
                            props.setBack(true);
                            props.setUsersToBeAddedContainer(false);
                          }}
                          className="bg-[#00aeff] hover:bg-[#00aeff] ml-2 absolute text-white w-[90%] py-5 text-sm mt-1"
                        >
                          Back
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {props.newRequestContainer && (
                  <div className="bg-white h-[100%] w-[98%] mt-1">
                    <p className="mx-5 text-sm">
                      to reject members press{" "}
                      <span className="text-red-600 font-bold">
                        <Close fontSize="small" className="p-[3px]" />
                      </span>
                    </p>
                    <p className="mx-5 text-sm">
                      to accept members press{" "}
                      <span className="text-[#00aeff] font-bold">
                        <Done fontSize="small" className="p-[3px]" />
                      </span>
                    </p>
                    <div className="bg-white overflow-y-scroll h-[90%] w-[98%] mt-1">
                      {props.newRequestData &&
                        props.newRequestData.map((el, i) => {
                          return (
                            <div
                              key={el._id}
                              className="flex w-[95%] h-[25%] mr-2 justify-between items-center mt-1 cursor-default hover:bg-gray-200 px-2 py-1"
                            >
                              <img
                                src={`${props.api + el.profilePicture}`}
                                alt="user"
                                className="h-[100%] w-[25%] object-cover rounded-sm"
                              />
                              <div className="flex items-center h-[100%] justify-between w-[70%]">
                                <div className="ml-2 flex flex-col justify-start text-lg">
                                  <p className="text-xs text-gray-600 font-bold w-44">
                                    full name:{" "}
                                    <span className="text-gray-500 font-bold">{el.firstName + " " + el.lastName}</span>
                                  </p>
                                  <p className="text-xs text-gray-600 font-bold w-44">
                                    user name: <span className="text-gray-500 font-normal">{el.userName}</span>
                                  </p>
                                  <p className="text-xs text-gray-600 font-bold w-44">
                                    email: <span className="text-gray-500 font-normal">{el.email}</span>
                                  </p>
                                </div>
                                <Done
                                  onClick={() => {
                                    props.requestAcceptHandler(el._id);
                                    props.requestAcceptedHandler(el.userName);
                                  }}
                                  fontSize="small"
                                  className="hover:bg-gray-400 text-[#00aeff] mt-3 w-4 cursor-pointer"
                                />
                                <Close
                                  onClick={() => props.requestRejectHandler(el._id)}
                                  fontSize="small"
                                  className="hover:bg-gray-400 ml-2 mt-3 text-red-600 w-4 cursor-pointer"
                                />
                              </div>
                            </div>
                          );
                        })}
                      {props.noRequest && (
                        <div className="absolute bottom-20 pt-6 left-10 pl-6 text-xl font-bold h-44 w-64 bg-white">
                          There is no new request
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {props.groupForm && (
        <div className="absolute z-20 rounded-sm flex flex-col justify-center items-center border border-gray-300 w-auto px-4 h-[20%] bg-white shadow-lg shadow-black right-2 top-5">
          <input
            onChange={(e) => props.setGroupName(e.target.value)}
            type="text"
            className="text-xs bg-gray-200 border border-gray-300 rounded-sm focus:outline-none mt-2 h-8 w-56 pl-2 mx-2"
            placeholder="Group name"
          />
          <input
            onChange={(e) => props.setGroupProfile(e.target.files[0])}
            type="file"
            name="groupPro"
            id=""
            className="w-56 bg-blue-400 text-sm h-8 absolute bottom-[50px] opacity-0"
          />
          <p className="w-56 mt-1 h-8 pt-1 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-200 border border-gray-300">
            <span>
              <PortraitOutlined className="" />
            </span>
            <span className="ml-2">Enter Groups profile picture </span>
          </p>
          <div className="flex gap-3 justify-between mx-2 items-center my-2">
            <button
              onClick={() => props.setGroupForm(false)}
              className="text-sm px-8 py-1 cursor-pointer mt-1 bg-gray-300 hover:bg-gray-200 rounded-sm"
            >
              Cancel
            </button>
            <button
              onClick={props.groupCreateHandler}
              className="text-sm hover:bg-[#00aeff] rounded-sm text-white px-8 mt-1 py-1 bg-[#00aeff]"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
