import React, { useState } from "react";
import ChatCard from "./Cards/ChatCard";

const ChatAvailable = ({ friendOnline, friendoffline, setcurrentUser, setuserextendedwindow ,setuserextendedwindowscalled ,lastMessage}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="search">
        <input
          type="text"
          className="w-full bg-zinc-800 text-white placeholder:text-zinc-300 placeholder:text-xs focus:outline-1 border-b-1 focus:outline-indigo-500 border-b-blue-500 rounded-md px-2 text-sm pb-1"
          placeholder="Search by username.."
        />
      </div>
      <div className="chat-online border-[1.4px] border-blue-600 rounded relative">
        <p className="text-white text-xs absolute top-[-10px] bg-[rgb(7, 1, 31)] left-4 font-300">
          Online
        </p>
        <div className="h-[23vh] w-full bg-[rgb(7, 1, 31)] pt-2 px-2 rounded-sm overflow-auto ">
          {friendOnline.length > 0 ? (
            friendOnline.map((items, index) => (
              <div key={index} className="mb-1" onClick={()=>{
             
                setcurrentUser(items);
                setuserextendedwindowscalled(true);
                setuserextendedwindow(true)
            }}>
              <ChatCard items={items} lastMessage={lastMessage} online={true} />
              </div>
            ))
          ) : (
            <p className="text-xs text-white w-full text-center">
              No User Available
            </p>
          )}
        </div>
      </div>
      <div className="chat-offline border-[1.4px] border-blue-600 rounded-md relative">
        <p className="text-white text-xs absolute top-[-10px] bg-[rgb(7, 1, 31)] left-4 font-100">
          Offline
        </p>
        <div className="h-[40vh] w-full bg-[rgb(7, 1, 31)] pt-2 px-2 rounded-sm overflow-auto ">
          {friendoffline.length > 0 ? (
            friendoffline.map((items, index) => (
              <div key={index} className="mb-1" onClick={()=>{
                setcurrentUser(items);
                  if(window.innerWidth<=436)
                  setuserextendedwindowscalled(true);
                else {
                  setuserextendedwindow(true)
                }
              }}>
              <ChatCard  items={items} lastMessage={lastMessage} online={false} />
              </div>
            ))
          ) : (
            <p className="text-xs text-white w-full text-center">
              No User Available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAvailable;
