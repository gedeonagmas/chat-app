import Menu from "@mui/icons-material/Menu";
import React, { useContext, useState } from "react";
import People from "@mui/icons-material/Diversity3";
import Close from "@mui/icons-material/Close";
import { navContext } from "../../../App";

const GroupSideVar = ({ props }) => {
  const context = useContext(navContext);

  return (
    <div className="bg-red-400 w-auto lg:flex-[40%]">
      <div className="bg-gray-100 w-[100%] hidden lg:block">
        <div className="absolute ml-6 mt-3 md:top-2 md:mt-0 flex justify-between">
          <input
            onChange={(e) => props.searchGroupHandler(e.target.value)}
            type="text"
            className="w-[98%] rounded-sm ml-3 h-12 border-b-2 pr-14 border-gray-400 focus:outline-none bg-transparent text-sm font-bold pl-4"
            placeholder="Search groups"
          />
        </div>
        <div className="overflow-y-scroll py-16 md:py-0 px-9 items-center pr-6 w-[98%] h-[100vh]">
          {props.groupsData &&
            props.groupsData.map((group) => {
              return (
                <div
                  id={group._id}
                  onClick={() => {
                    props.setCurrentGroup(group);
                    props.underlineHandler(group._id);
                    props.setGroupIds(group._id);
                    props.groupJoinHandler(group._id, group.groupName, "groups");
                    props.setWellCome(false);
                    props.setPlease(false);
                    props.setWriteMessage(false);
                  }}
                  className="flex gap-2 py-[3px] px-1 mt-[6px] hover:bg-gray-300 cursor-pointer "
                  key={group._id}
                >
                  <img
                    src={`${props.api + group.groupPro}`}
                    className="h-11 w-11 mt-[6px] border border-slate-300 object-cover rounded-full "
                    alt="pro"
                  />{" "}
                  <div className="text-xs mt-[5px]">
                    <p className="flex flex-col font-extrabold">{group.groupName}</p>
                    <p className="font-bold mt-1 text-gray-500 text-sm">
                      admin <span className="font-bold text-[#00aeff]">{group.ownersName}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          {props.isFetchingGroup && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">Loading...</p>}
          {props.isErrorGroup && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">something went wrong!</p>}
          {props.groupsData && props.groupsData.length === 0 && (
            <p className="text-sm mt-10 ml-4 font-bold text-gray-400">Groups Not Found!</p>
          )}
        </div>
      </div>
      {context.groupNavigateSmall && (
        <div className="bg-gray-100 lg:hidden absolute top-0 z-30 w-[100%] left-0">
          <Close
            onClick={() => context.setGroupNavigateSmall(false)}
            className="absolute cursor-pointer z-40 top-2 right-1 hover:text-black text-gray-500"
            fontSize="small"
          />
          <div className="absolute ml-6 mt-3 w-[90%] flex justify-between">
            <input
              onChange={(e) => props.searchGroupHandler(e.target.value)}
              type="text"
              className="w-[98%] rounded-sm ml-3 h-12 border-b-2 pr-14 border-gray-400 focus:outline-none bg-transparent text-sm font-bold pl-4"
              placeholder="Search groups"
            />
          </div>
          <div className="overflow-y-scroll py-16 px-9 items-center pr-6 w-[98%] h-[100vh]">
            {props.groupsData &&
              props.groupsData.map((group) => {
                return (
                  <div
                    id={group._id}
                    onClick={() => {
                      props.setCurrentGroup(group);
                      props.underlineHandler(group._id);
                      props.setGroupIds(group._id);
                      props.groupJoinHandler(group._id, group.groupName, "groups");
                      props.setWellCome(false);
                      props.setPlease(false);
                      props.setWriteMessage(false);
                      context.setGroupNavigateSmall(false);
                    }}
                    className="flex gap-2 py-[3px] px-1 mt-[6px] hover:bg-gray-300 cursor-pointer "
                    key={group._id}
                  >
                    <img
                      src={`${props.api + group.groupPro}`}
                      className="h-11 w-11 mt-[6px] border border-slate-300 object-cover rounded-full "
                      alt="pro"
                    />{" "}
                    <div className="text-xs mt-[5px]">
                      <p className="flex flex-col font-extrabold">{group.groupName}</p>
                      <p className="font-bold mt-1 text-gray-500 text-sm">
                        admin <span className="font-bold text-[#00aeff]">{group.ownersName}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            {props.isFetchingGroup && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">Loading...</p>}
            {props.isErrorGroup && <p className="text-sm mt-10 ml-4 font-bold text-gray-500">something went wrong!</p>}
            {props.groupsData && props.groupsData.length === 0 && (
              <p className="text-sm mt-10 ml-4 font-bold text-gray-400">Groups Not Found!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSideVar;
