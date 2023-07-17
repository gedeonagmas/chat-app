import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import Folder from "@mui/icons-material/Folder";
import React from "react";
import Close from "@mui/icons-material/Close";
import Loading from "../../landing/Loading";

const MessageField = ({ props }) => {
  return (
    <div className="bg-white border border-gray-300 flex justify-between items-center h-14 absolute bottom-[2px] w-[100%]">
      {!props.wellCome && (
        <Folder
          onClick={() => {
            props.setFileSendFlag(true);
          }}
          className="text-[#00aeff] ml-1 my-2 cursor-pointer hover:text-[#00aeff]"
          sx={{ width: 32, height: 32 }}
        />
      )}
      {props.wellCome && (
        <Folder
          onClick={() => props.setPlease(true)}
          className="text-[#00aeff] ml-1 my-2 cursor-default"
          sx={{ width: 32, height: 32 }}
        />
      )}
      {props.please && (
        <p className="absolute text-xs text-black -mt-10 ml-[12%] bg-white border border-black rounded-lg py-2 px-2">
          please first select a user or group that you want to chat with
        </p>
      )}
      {props.fileSendFlag && (
        <div className="absolute w-[100%] h-auto py-4 px-4 rounded-sm bg-gray-100 border border-gray-400 bottom-1 text-xs">
          <Close
            onClick={() => props.setFileSendFlag(false)}
            fontSize="small"
            className="text-xs absolute top-0 right-1 text-gray-600 ml-[184px] mt-1 cursor-pointer hover:bg-gray-200 hover:text-black"
          />
          <input
            onChange={(e) => props.setFileDescription(e.target.value)}
            type="text"
            className="w-[100%] mt-6 h-12 focus:outline-none border border-gray-300 mx-2 pl-1"
            placeholder="Description"
          />
          <div className="flex relative w-[100%] gap-x-1 mx-2 justify-between mt-5">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files[0] !== undefined) {
                  props.setFiles(e.target.files[0]);
                  document.getElementById("fileSend").removeAttribute("disabled");
                } else if (e.target.files[0] === undefined) {
                  document.getElementById("fileSend").setAttribute("disabled", true);
                }
              }}
              name="fileUpload"
              className="absolute opacity-0 w-[70%] text-sm h-12 border text-center border-gray-400"
            />
            <p className="w-[70%] text-sm text-[#00aeff] py-2 px-4 font-bold h-12 border border-gray-400">
              <Folder fontSize="small" /> <span className="ml-3">Select file</span>
            </p>
            <button
              id="fileSend"
              onClick={(e) => {
                e.preventDefault();
                props.setLoading(true);
                props.fileHandler();
                props.setFileSendFlag(false);
                if (props.files.name === undefined) {
                  props.setLoading(false);
                }
              }}
              className="w-[26%] fileSend text-lg hover:text-gray-200 font-bold bg-[#00aeff] h-12 text-white hover:bg-[#00aeff]"
            >
              send
            </button>
          </div>
        </div>
      )}
      <input
        id="inp"
        onChange={(e) => {
          const ids = document.getElementById("inp");
          if (ids?.value.length > 0) {
            props.setWriteMessage(false);
          }
          props.setMessage(e.target.value);
          props.typingHandler(e);
        }}
        type="text"
        className="h-[52px]  text-xs md:text-sm font-bold focus:outline-none w-[70vh] px-2 "
        placeholder="write your message here"
      />
      {/* <EmojiEmotions className="text-yellow-400 my-2" sx={{ width: 32, height: 32 }} /> */}
      {!props.wellCome && props.loading ? (
        <div className="bg-[#00aeff] hover:text-gray-200 flex items-center justify-center font-bold h-12 text-sm md:text-lg mx-[5px] my-[4px] cursor-pointer text-white w-[15%] md:w-[20%]">
          <Loading />
        </div>
      ) : (
        !props.wellCome && (
          <button
            onClick={(e) => {
              props.setLoading(true);
              e.preventDefault();
              props.setSayHi(false);
              const ids = document.getElementById("inp");
              if (ids.value.length === 0) {
                props.setWriteMessage(true);
                return;
              } else {
                props.setWriteMessage(false);
                props.messageSendHandler();
                ids.value = "";
              }
            }}
            className="bg-[#00aeff] hover:text-gray-200 font-bold h-12 text-sm md:text-lg mx-[5px] my-[4px] cursor-pointer text-white w-[15%] md:w-[20%]"
          >
            Send
          </button>
        )
      )}

      {props.wellCome && (
        <button
          onClick={() => {
            props.setPlease(true);
          }}
          className="bg-[#00aeff] font-bold h-12 text-sm md:text-lg mx-[5px] my-[4px] cursor-default text-white w-[15%] md:w-[20%]"
        >
          Send
        </button>
      )}
    </div>
  );
};

export default MessageField;
