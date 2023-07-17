import FilePresent from "@mui/icons-material/FilePresent";
import React, { useEffect, useState } from "react";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { format } from "timeago.js";
import Download from "@mui/icons-material/Download";

const aaa = "http://localhost:2000/uploads/userDefault.png";
const Messages = ({ props }) => {
  const [len, setLen] = useState();
  const handleDownload = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <div className="overflow-y-scroll pt-2 pb-6 text-sm bg-white border border-gray-300  h-[83vh] w-[100%] ">
      {props.wellCome && (
        <div className="absolute z-10 flex flex-col items-center justify-center h-[82.5%] w-[99%] -mt-[8px]">
          <img src="./phone.jpg" alt="chat" className="h-72 w-[378px] rounded-sm mt-1" />
          <p className="text-lg font-extrabold text-[#00aeff] mt-1">well come to My chat dashboard</p>
          <p className="text-lg font-semibold text-[#00aeff]">click each users to chat with them</p>
        </div>
      )}
      {props.sayHi && (
        <div className="absolute bg-white flex flex-col items-center justify-center h-[50px] w-[99%] mt-[190px]">
          <p className="text-lg font-semibold text-gray-500">
            say <span className="font-bold text-[#00aeff]">hi</span> to your friends
          </p>
        </div>
      )}
      {props.writeMessage && (
        <div className="absolute z-10 shadow-xl bg-white shadow-black  items-center justify-center border border-black px-2 py-2 bottom-12 ml-40">
          <p className="text-xs font-semibold text-black bg-white">please write a message</p>
          <div className="absolute z-20 ml-12 h-4 w-4 rotate-45 bg-white border border-black border-t-0 border-l-0"></div>
        </div>
      )}
      {props.texts &&
        props.texts.map((el, i) => {
          return (
            <div key={el.time} className="">
              {el.content !== "" && el.messageType === "text" && el.sender === props.currentUser.userName && (
                <div key={el.time} className="w-[100%] mt-5 relative justify-end flex pr-3">
                  <div className="flex gap-1 relative">
                    <div className="mt-4 relative">
                      <p className="text-sm font-semibold max-w-[300px] text-white px-4 rounded-2xl py-2 bg-[#00aeff]">
                        {el.content}
                      </p>
                      <p className=" -mr-16 w-[110px] text-xs py-2">
                        <AccessTimeFilledIcon fontSize="small" className="text-[#00aeff] p-[2px]" />
                        {format(el.time)}
                      </p>
                    </div>{" "}
                    <img
                      src={`${props.api + el.image}`}
                      alt="profile"
                      className="h-10 w-10 border border-[#00aeff] rounded-full"
                    />
                  </div>
                </div>
              )}

              {el.content !== "" && el.messageType === "text" && el.sender !== props.currentUser.userName && (
                <div key={el.time} className="w-[100%] pl-3 mt-5 mb-3 justify-start flex">
                  <div className="flex gap-1">
                    <img
                      src={`${props.api + el.image}`}
                      alt="profile"
                      className="h-10 w-10 rounded-full border border-slate-400"
                    />
                    <div className="mt-4 relative">
                      <p className="text-sm font-semibold max-w-[300px] text-black px-4 rounded-2xl  py-2 bg-slate-300">
                        {el.content}
                      </p>
                      <p className=" w-[110px] text-xs py-2">
                        <AccessTimeFilledIcon fontSize="small" className="text-[#00aeff] p-[2px]" />
                        {format(el.time)}
                      </p>
                    </div>{" "}
                  </div>{" "}
                </div>
              )}

              <div ref={props.refer} />
              {el.messageType === "file" && el.sender === props.currentUser.userName && (
                <div className="w-[100%] h-auto px-2 bg-white flex flex-col relative">
                  <div className="flex h-auto bg-white justify-end">
                    <div className="">
                      <img
                        src={`${props.api + el.image}`}
                        className="h-8 border border-gray-300 w-8 mt-[6px] mx-1 object-cover rounded-full"
                        alt="pro"
                      />{" "}
                    </div>
                    <div className="w-[50%]">
                      <p className="text-xs ml-1 my-[3px]">you</p>
                      {/* ################################### audio ############################# */}
                      {el.mimeType.split("/")[0] === "audio" && (
                        <div
                          className="w-[100%] bg-[#00aeff] flex gap-3 items-center justify-center flex-col text-white rounded-md "
                          key={el.time}
                        >
                          <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                            <p className="text-xl font-extrabold w-auto mt-4 uppercase">{el.mimeType.split("/")[0]}</p>
                            <p
                              onClick={() => handleDownload(`${props.api + el.path}`)}
                              className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                            >
                              <Download fontSize="small" />
                            </p>
                          </div>
                          <audio
                            controls
                            src={`${props.api + el.path}`}
                            className="w-[98%] h-32 object-cover mt-[2px] mx-[2px]"
                          ></audio>
                          <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                            <p className="text-sm font-bold w-auto ">
                              File Type : <span className="font-normal">{el.mimeType}</span>
                            </p>
                            <p className="text-sm font-bold w-auto px-10 ">
                              File Name : <span className="font-normal">{el.originalName}</span>
                            </p>
                            <p className="text-sm font-bold w-auto">
                              Size: <span className="font-normal">{el.size} MB</span>
                            </p>
                            <p className="text-sm font-bold mx-10 w-auto maxs mb-2">
                              Description : <span className="font-normal">{el.fileDescription}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {/* ################################### video ############################### */}
                      {el.mimeType.split("/")[0] === "video" && (
                        <div
                          className="w-[100%] bg-[#00aeff] items-center flex flex-col text-white rounded-md "
                          key={el.time}
                        >
                          <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                            <p className="text-xl font-extrabold w-auto mt-4 uppercase">{el.mimeType.split("/")[0]}</p>
                            <p
                              onClick={() => handleDownload(`${props.api + el.path}`)}
                              className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                            >
                              <Download fontSize="small" />
                            </p>
                          </div>
                          <video
                            controls
                            src={`${props.api + el.path}`}
                            className="w-[98%] h-40 object-cover mt-[2px] mx-[2px]"
                          ></video>
                          <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                            <p className="text-sm font-bold w-auto ">
                              File Type : <span className="font-normal">{el.mimeType}</span>
                            </p>
                            <p className="text-sm font-bold w-auto px-10 ">
                              File Name : <span className="font-normal">{el.originalName}</span>
                            </p>
                            <p className="text-sm font-bold w-auto">
                              Size: <span className="font-normal">{el.size} MB</span>
                            </p>
                            <p className="text-sm mx-10 font-bold w-auto maxs mb-2">
                              Description : <span className="font-normal">{el.fileDescription}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {/* ################################## image ################################# */}
                      {el.mimeType.split("/")[0] === "image" && (
                        <div
                          className="w-[100%] bg-[#00aeff] items-center flex flex-col text-white rounded-md  "
                          key={el.time}
                        >
                          <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                            <p className="text-xl font-extrabold w-auto mt-4 uppercase">{el.mimeType.split("/")[0]}</p>
                            <p
                              onClick={() => handleDownload(`${props.api + el.path}`)}
                              className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                            >
                              <Download fontSize="small" />
                            </p>
                          </div>
                          <img
                            src={`${props.api + el.path}`}
                            alt="user"
                            className="w-[98%] h-[100%] object-cover mt-[2px] mx-[2px]"
                          />
                          <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                            <p className="text-sm font-bold w-auto ">
                              File Type : <span className="font-normal">{el.mimeType}</span>
                            </p>
                            <p className="text-sm font-bold w-auto px-10 ">
                              File Name : <span className="font-normal">{el.originalName}</span>
                            </p>
                            <p className="text-sm font-bold w-auto">
                              Size: <span className="font-normal">{el.size} MB</span>
                            </p>
                            <p className="text-sm mx-10 font-bold w-auto maxs mb-2">
                              Description : <span className="font-normal">{el.fileDescription}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {el.mimeType.split("/")[0] !== "image" &&
                        el.mimeType.split("/")[0] !== "audio" &&
                        el.mimeType.split("/")[0] !== "video" && (
                          <div
                            className="w-[100%] bg-[#00aeff] items-center flex flex-col text-white rounded-md  "
                            key={el.time}
                          >
                            <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                              <p className="text-xl font-extrabold w-auto mt-4 uppercase">
                                {el.mimeType.split("/")[1]}
                              </p>
                              <p
                                onClick={() => handleDownload(`${props.api + el.path}`)}
                                className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                              >
                                <Download fontSize="small" />
                              </p>
                            </div>

                            <FilePresent className="text-white" sx={{ width: 44, height: 44 }} />
                            <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                              <p className="text-sm font-bold w-auto ">
                                File Type : <span className="font-normal">{el.mimeType}</span>
                              </p>
                              <p className="text-sm font-bold w-auto px-10 ">
                                File Name : <span className="font-normal">{el.originalName}</span>
                              </p>
                              <p className="text-sm font-bold w-auto">
                                Size: <span className="font-normal">{el.size} MB</span>
                              </p>
                              <p className="text-sm mx-10 font-bold w-auto maxs mb-2">
                                Description : <span className="font-normal">{el.fileDescription}</span>
                              </p>
                            </div>
                          </div>
                        )}
                      <p className="justify-end flex w-[100%] text-xs py-2">
                        <AccessTimeFilledIcon fontSize="small" className="text-[#00aeff] p-[2px]" />
                        {format(el.time)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* ###################################### for other user ############################### */}
              {el.messageType === "file" && el.sender !== props.currentUser.userName && (
                <div className="w-[100%] h-auto px-2 bg-white flex flex-col relative">
                  <div className="flex h-auto bg-white justify-start">
                    <div className="">
                      <img
                        src={`${props.api + el.image}`}
                        className="h-8 border border-gray-300 w-8 mt-[6px] mx-1 object-cover rounded-full"
                        alt="pro"
                      />{" "}
                    </div>
                    <div className="w-[50%]">
                      <p className="text-xs ml-1 my-[3px]">{el.sender}</p>
                      {/* ################################### audio ############################# */}
                      {el.mimeType.split("/")[0] === "audio" && (
                        <div
                          className="w-[100%] bg-slate-300 flex gap-3 items-center justify-center flex-col text-black rounded-md "
                          key={el.time}
                        >
                          <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                            <p className="text-xl font-extrabold w-auto mt-4 uppercase">{el.mimeType.split("/")[0]}</p>
                            <p
                              onClick={() => handleDownload(`${props.api + el.path}`)}
                              className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                            >
                              <Download fontSize="small" />
                            </p>
                          </div>
                          <audio
                            controls
                            src={`${props.api + el.path}`}
                            className="w-[98%] h-32 object-cover mt-[2px] mx-[2px]"
                          ></audio>
                          <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                            <p className="text-sm font-bold w-auto ">
                              File Type : <span className="font-normal">{el.mimeType}</span>
                            </p>
                            <p className="text-sm font-bold w-auto px-10 ">
                              File Name : <span className="font-normal">{el.originalName}</span>
                            </p>
                            <p className="text-sm font-bold w-auto">
                              Size: <span className="font-normal">{el.size} MB</span>
                            </p>
                            <p className="text-sm font-bold mx-10 w-auto maxs mb-2">
                              Description : <span className="font-normal">{el.fileDescription}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {/* ################################### video ############################### */}
                      {el.mimeType.split("/")[0] === "video" && (
                        <div
                          className="w-[100%] bg-slate-300 items-center flex flex-col text-black rounded-md "
                          key={el.time}
                        >
                          <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                            <p className="text-xl font-extrabold w-auto mt-4 uppercase">{el.mimeType.split("/")[0]}</p>
                            <p
                              onClick={() => handleDownload(`${props.api + el.path}`)}
                              className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                            >
                              <Download fontSize="small" />
                            </p>
                          </div>
                          <video
                            controls
                            src={`${props.api + el.path}`}
                            className="w-[98%] h-40 object-cover mt-[2px] mx-[2px]"
                          ></video>
                          <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                            <p className="text-sm font-bold w-auto ">
                              File Type : <span className="font-normal">{el.mimeType}</span>
                            </p>
                            <p className="text-sm font-bold w-auto px-10 ">
                              File Name : <span className="font-normal">{el.originalName}</span>
                            </p>
                            <p className="text-sm font-bold w-auto">
                              Size: <span className="font-normal">{el.size} MB</span>
                            </p>
                            <p className="text-sm mx-10 font-bold w-auto maxs mb-2">
                              Description : <span className="font-normal">{el.fileDescription}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {/* ################################## image ################################# */}
                      {el.mimeType.split("/")[0] === "image" && (
                        <div
                          className="w-[100%] bg-slate-300 flex items-center flex-col text-black rounded-md  "
                          key={el.time}
                        >
                          <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                            <p className="text-xl font-extrabold w-auto mt-4 uppercase">{el.mimeType.split("/")[0]}</p>
                            <p
                              onClick={() => handleDownload(`${props.api + el.path}`)}
                              className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                            >
                              <Download fontSize="small" />
                            </p>
                          </div>

                          <img
                            src={`${props.api + el.path}`}
                            alt="user"
                            className="w-[98%] h-[100%] object-cover mt-[2px] mx-[2px]"
                          />
                          <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                            <p className="text-sm font-bold w-auto ">
                              File Type : <span className="font-normal">{el.mimeType}</span>
                            </p>
                            <p className="text-sm font-bold w-auto px-10 ">
                              File Name : <span className="font-normal">{el.originalName}</span>
                            </p>
                            <p className="text-sm font-bold w-auto">
                              Size: <span className="font-normal">{el.size} MB</span>
                            </p>
                            <p className="text-sm mx-10 font-bold w-auto maxs mb-2">
                              Description : <span className="font-normal">{el.fileDescription}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {el.mimeType.split("/")[0] !== "image" &&
                        el.mimeType.split("/")[0] !== "audio" &&
                        el.mimeType.split("/")[0] !== "video" && (
                          <div
                            className="w-[100%] bg-slate-300 items-center flex flex-col text-black rounded-md  "
                            key={el.time}
                          >
                            <div className="flex justify-between items-center py-2 px-2 w-[100%]">
                              <p className="text-xl font-extrabold w-auto mt-4 uppercase">
                                {el.mimeType.split("/")[1]}
                              </p>
                              <p
                                onClick={() => handleDownload(`${props.api + el.path}`)}
                                className="rounded-lg py-1 cursor-pointer hover:bg-gray-300 px-2 bg-gray-100 text-[#00aeff]"
                              >
                                <Download fontSize="small" />
                              </p>
                            </div>

                            <FilePresent className="text-black" sx={{ width: 44, height: 44 }} />
                            <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                              <p className="text-sm font-bold w-auto ">
                                File Type : <span className="font-normal">{el.mimeType}</span>
                              </p>
                              <p className="text-sm font-bold w-auto px-10 ">
                                File Name : <span className="font-normal">{el.originalName}</span>
                              </p>
                              <p className="text-sm font-bold w-auto">
                                Size: <span className="font-normal">{el.size} MB</span>
                              </p>
                              <p className="text-sm mx-10 font-bold w-auto maxs mb-2">
                                Description : <span className="font-normal">{el.fileDescription}</span>
                              </p>
                            </div>
                          </div>
                        )}
                      {/* ################################### other file type ######################## */}
                      <p className="justify-start flex w-[100%] text-xs py-2">
                        <AccessTimeFilledIcon fontSize="small" className="text-[#00aeff] p-[2px]" />
                        {format(el.time)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      {props.typing && <p className="text-sm text-[#00aeff] ml-2 mt-1">typing...</p>}
      {/* <div ref={refer} /> */}
    </div>
  );
};

export default Messages;
