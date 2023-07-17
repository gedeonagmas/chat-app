import Close from "@mui/icons-material/Close";
import Person from "@mui/icons-material/Person2";
import React, { useContext, useState } from "react";
import { navContext } from "../../../App";

const PrivateSideVar = ({ props }) => {
  const context = useContext(navContext);

  return (
    <div className="bg-gray-100 w-auto lg:flex-[40%]">
      {context.privateNavigateSmall && (
        <div className="bg-gray-100 w-[100%] absolute z-30 top-0 left-0 flex flex-col lg:hidden">
          <Close
            onClick={() => context.setPrivateNavigateSmall(false)}
            className="absolute cursor-pointer top-1 right-1 hover:text-black text-gray-500"
            fontSize="small"
          />
          <div className="absolute ml-6 mt-3 flex justify-between">
            <input
              onChange={(e) => props.userSearchHandler(e.target.value)}
              type="text"
              className="w-[98%] rounded-sm ml-3 h-12 border-b-2 pr-14 border-gray-400 focus:outline-none bg-transparent text-sm font-bold pl-4"
              placeholder="Search individual users"
            />
          </div>
          <div className="overflow-y-scroll py-16 px-9 items-center pr-6 w-[98%] h-[100vh]">
            {props.userData &&
              props.userData.map((users, i) => {
                return (
                  users._id !== props.currentUser._id && (
                    <div
                      key={users._id}
                      id={users._id}
                      onClick={() => {
                        props.underlineHandler(users._id);
                        props.createRoomHandler(
                          `${users._id}//${props.currentUser._id}`,
                          `${props.currentUser._id}//${users._id}`,
                          users.userName,
                          "private"
                        );
                        props.setWellCome(false);
                        props.setPlease(false);
                        props.setJoinFlag(false);
                        props.setManageGroup(false);
                        props.setWriteMessage(false);
                        context.setPrivateNavigateSmall(false);
                      }}
                      className="flex relative cursor-pointer text-white py-[3px] rounded-sm px-2 gap-x-2 hover:bg-gray-300 mt-2"
                    >
                      <img
                        src={`${props.api + users.profilePicture}`}
                        className="h-11 w-11 mt-[6px] border border-slate-200 object-cover rounded-full "
                        alt="pro"
                      />{" "}
                      <div key={users.userName} className="text-sm font-semibold mt-[5px] relative">
                        <p className="font-extrabold text-gray-600">{users.firstName + " " + users.lastName}</p>
                        <p key={users.userName} className="text-[#00aeff] font-bold">
                          {users.userName}
                          {props.onlineUsers &&
                            props.onlineUsers.map((e) => {
                              return e.name.includes(users.userName) ? (
                                <span key={e.name} className="ml-3 text-gray-500 text-xs">
                                  online now
                                </span>
                              ) : (
                                <span key={e.name} className="ml-3 text-black"></span>
                              );
                            })}
                        </p>{" "}
                      </div>
                      <div className="absolute bg-gray-400 ml-[26px] mt-[6px] h-[18px] w-[18px] rounded-full"></div>
                      <div className="font-semibold text-[#00aeff]" key={users.fullName}>
                        {props.onlineUsers &&
                          props.onlineUsers.map((el) => {
                            if (el.name.includes(users.userName)) {
                              return (
                                <div
                                  key={users.fullName}
                                  className="absolute bottom-[30px] left-[34px] bg-[#00aeff] h-[18px] w-[18px] rounded-full"
                                ></div>
                              );
                            }
                            return true;
                          })}
                      </div>
                    </div>
                  )
                );
              })}
            {props.isFetchingUser && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">Loading...</p>}
            {props.isErrorUser && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">Something went wrong!</p>}
            {props.userData && props.userData.length === 0 && (
              <p className="text-sm mt-10 ml-4 font-bold text-gray-400">Users Not Found!</p>
            )}
          </div>
        </div>
      )}
      <div className="bg-gray-100 flex-[40%] hidden lg:block">
        <div className="absolute z-50 bg-gray-100 ml-6 top-2 flex justify-between">
          <input
            onChange={(e) => props.userSearchHandler(e.target.value)}
            type="text"
            className="w-[98%] rounded-sm ml-3 h-12 border-b-2 pr-14 border-gray-400 focus:outline-none bg-transparent text-sm font-bold pl-4"
            placeholder="Search individual users"
          />
        </div>
        <div className="overflow-y-scroll  my-16 px-9 items-center pr-6 w-[98%] h-[100vh]">
          {props.userData &&
            props.userData.map((users, i) => {
              return (
                users._id !== props.currentUser._id && (
                  <div
                    key={users._id}
                    id={users._id}
                    onClick={() => {
                      props.underlineHandler(users._id);
                      props.createRoomHandler(
                        `${users._id}//${props.currentUser._id}`,
                        `${props.currentUser._id}//${users._id}`,
                        users.userName,
                        "private"
                      );
                      props.setWellCome(false);
                      props.setPlease(false);
                      props.setJoinFlag(false);
                      props.setManageGroup(false);
                      props.setWriteMessage(false);
                    }}
                    className="flex relative cursor-pointer text-white py-[3px] rounded-sm px-2 gap-x-2 hover:bg-gray-300 mt-2"
                  >
                    <img
                      src={`${props.api + users.profilePicture}`}
                      className="h-11 w-11 mt-[6px] border border-slate-200 object-cover rounded-full "
                      alt="pro"
                    />{" "}
                    <div key={users.userName} className="text-sm font-semibold mt-[5px] relative">
                      <p className="font-extrabold text-gray-600">{users.firstName + " " + users.lastName}</p>
                      <p key={users.userName} className="text-[#00aeff] font-bold">
                        {users.userName}
                        {props.onlineUsers &&
                          props.onlineUsers.map((e) => {
                            return e.name.includes(users.userName) ? (
                              <span key={e.name} className="ml-3 text-gray-500 text-xs">
                                online now
                              </span>
                            ) : (
                              <span key={e.name} className="ml-3 text-black"></span>
                            );
                          })}
                      </p>{" "}
                    </div>
                    <div className="absolute bg-gray-400 ml-[26px] mt-[6px] h-[18px] w-[18px] rounded-full"></div>
                    <div className="font-semibold text-[#00aeff]" key={users.fullName}>
                      {props.onlineUsers &&
                        props.onlineUsers.map((el) => {
                          if (el.name.includes(users.userName)) {
                            return (
                              <div
                                key={users.fullName}
                                className="absolute bottom-[30px] left-[34px] bg-[#00aeff] h-[18px] w-[18px] rounded-full"
                              ></div>
                            );
                          }
                          return true;
                        })}
                    </div>
                  </div>
                )
              );
            })}
          {props.isFetchingUser && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">Loading...</p>}
          {props.isErrorUser && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">Something went wrong!</p>}
          {props.userData && props.userData.length === 0 && (
            <p className="text-sm mt-10 ml-4 font-bold text-gray-400">Users Not Found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateSideVar;
