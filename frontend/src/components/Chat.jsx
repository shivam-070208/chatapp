import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatAvailable from "./ChatAvailable";
import Chatextended from "./Chatextended";
import Community from "./Community";


const Chat = ({
  communitygroups,
  Socket,
  Email,
  friendOnline,
  friendoffline,
}) => {
  const [Datef, setDate] = useState("");
  const [chatWindow, setuserextendedwindowscalled] = useState(false);
  const [lastMessage, setlastMessage] = useState("");

  const [currentUser, setcurrentUser] = useState("");
  const [currentUserurl, setcurrentUserurl] = useState("");
  const [userextendedwindow, setuserextendedwindow] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 436) {
      setuserextendedwindowscalled(false);
    }
    else{
      setuserextendedwindow(false)
    }
  }, [window.innerWidth, chatWindow]);
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date().toLocaleTimeString();
      setDate(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex pt-9 gap-2">
      
      {!chatWindow && (
        <div className="w-[360px] h-[80vh] justify-between max-[436px]:w-[100%] max-[780]:w-[330px] flex flex-col">
          <nav className="max-w-[full]  bg-zinc-800 border-b-blue-600 py-1  border-[1.7px] boder- flex pb-1  justify-center rounded text-[0.6rem]">
            <div className="border-r-2 pr-2 pb-1 border-[#9697a1]">
              <Link
                to="/"
                className={`${
                  communitygroups ? "text-zinc-300" : "text-blue-400"
                } font-[600]`}
              >
                Friends
              </Link>
              <Link
                to="/Community"
                className={`${
                  !communitygroups ? "text-zinc-300" : "text-white"
                } ml-3 font-[600]`}
              >
                Communitygroups
              </Link>
            </div>
            <div className="border-r-2 pr-2 pb-1 text-zinc-400 pl-3 font-[600] border-[#9697a1]">
              Local time: <span className="text-white">{Datef}</span>
            </div>
            <div className="pb-1 text-white pl-3 font-[600] border-[#9697a1]">
              <Link to="/Profile"> Edit Your profile</Link>
            </div>
          </nav>
          {communitygroups ? (
            <Community friendOnline={friendOnline} Socket={Socket} Email={Email}/>
          ) : (
            <ChatAvailable
              friendOnline={friendOnline} lastMessage={lastMessage}
              setuserextendedwindow={setuserextendedwindow}
              setuserextendedwindowscalled={setuserextendedwindowscalled}
              friendoffline={friendoffline}
              setcurrentUser={setcurrentUser}
            />
          )}
        </div>
      )}
      {userextendedwindow && !chatWindow && (
        <div className="w-[calc(100%-340px)] max-[436px]:hidden">
          <Chatextended setlastMessage={setlastMessage}
            currentUser={currentUser}
            Socket={Socket}
            Email={Email}
          />
        </div>
      )}
      {chatWindow &&!userextendedwindow && (
        <div className="w-full h-[80vh]">
          <Chatextended setlastMessage={setlastMessage}
            currentUser={currentUser}
            Socket={Socket}
            Email={Email}
          />
        </div>
      )}
      {!chatWindow&&window.innerWidth>436 && !userextendedwindow && (
        <div className="w-[calc(100%-340px)]  h-[80vh] flex justify-center items-center">
          <div className="text-center text-zinc-400">
            <h1 className="text-2xl font-bold text-white">
              Welcome to ChatApp!
            </h1>
            <p className="mt-2">
              Connect, share, and chat with your friends and community.
            </p>
            <p className="mt-1">
              Select a friend or community to start a conversation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
