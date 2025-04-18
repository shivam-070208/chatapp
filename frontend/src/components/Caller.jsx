import React, { useEffect, useRef, useState } from "react";
import { Peer } from "https://esm.sh/peerjs@1.5.4?bundle-deps";

const Caller = ({ friendOnline, Socket, Email }) => {
  const remoteVedioref = useRef(null);
  const [call, setCall] = useState(false);
  const [CallConnected, setCallConnected] = useState(false);
  const [CallReceived, setCallReceived] = useState(false);
  const localvideoref = useRef(null);
  const [peerId, setPeerId] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);
  const [peer, setPeer] = useState(null);
  const [friendEmail, setFriendEmail] = useState(null);

  useEffect(() => {
    if (Socket) {
      Socket.on("callreceived", (data) => {
        setCall(true);
        setCallReceived(true);
        setRemotePeerId(data.peerId);
        setFriendEmail(data.callerEmail);
      });
    }
    return () => {
      if (Socket) {
        Socket.off("callreceived");
      }
    };
  }, [Socket]);

  Socket.on("calldeclined", async (data) => {});

  const handleCallDecline = () => {
    Socket.emit("calldeclined", { callerEmail: friendEmail });
    setCall(false);
    setCallReceived(false);
    setCallConnected(false);
    if (localvideoref.current) {
      const tracks = localvideoref.current.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
      localvideoref.current.srcObject = null;
    }
  };

  const handleCallEnd = () => {
    Socket.emit("callended", { remotePeerId });
    setCall(false);
    setCallReceived(false);
    setCallConnected(false);
    if (localvideoref.current) {
      const tracks = localvideoref.current.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
      localvideoref.current.srcObject = null;
    }
    if (remoteVedioref.current) {
      const tracks = remoteVedioref.current.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
      remoteVedioref.current.srcObject = null;
    }
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
  };

  useEffect(() => {
    if (call && !CallConnected && CallReceived) {
      const timeout = setTimeout(() => {
        handleCallDecline();
      }, 30000);
      return () => clearTimeout(timeout);
    }
  }, [call, CallConnected, CallReceived]);

  useEffect(() => {
    if (Socket) {
      Socket.on("calldeclined", () => {
        handleCallEnd();
      });
      Socket.on("callended", () => {
        handleCallEnd();
      });
    }
    return () => {
      if (Socket) {
        Socket.off("calldeclined");
        Socket.off("callended");
      }
    };
  }, [Socket]);

  const handleCallAccepted = async () => {
    try {
      setCallReceived(false);
      const peer = new Peer();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localvideoref.current) {
        localvideoref.current.srcObject = stream;
      }
      const call = peer.call(remotePeerId, stream);
      call.on("stream", (remoteStream) => {
        setCallConnected(true);
        if (remoteVedioref.current) {
          remoteVedioref.current.srcObject = remoteStream;
          remoteVedioref.current.play();
        }
      });
      setPeer(peer);
      call.on("close", () => {
        setCallConnected(false);
        setCall(false);
        if (localvideoref.current) {
          const tracks = localvideoref.current.srcObject?.getTracks();
          tracks?.forEach((track) => track.stop());
          localvideoref.current.srcObject = null;
        }
        if (remoteVedioref.current) {
          const tracks = remoteVedioref.current.srcObject?.getTracks();
          tracks?.forEach((track) => track.stop());
          remoteVedioref.current.srcObject = null;
        }
      });
    } catch (error) {
      alert("Error: " + error.message);
      handleCallDecline();
    }
  };

  const handleCall = async (items) => {
    try {
      setCall(true);
      const peer = new Peer();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (localvideoref.current) {
        localvideoref.current.srcObject = stream;
      }
      peer.on("open", (id) => {
        setPeerId(id);
        Socket.emit("makeacall", { RemoteEmail: items.Email, peerId: id, Email: Email });
      });
      peer.on("call", (incomingCall) => {
        setCallConnected(true);
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          if (remoteVedioref.current) {
            remoteVedioref.current.srcObject = remoteStream;
            remoteVedioref.current.play();
          }
        });
      });
      setPeer(peer);
    } catch (error) {
      setCall(false);
    }
  };

  return (
    <div className="w-full h-[85vh] mt-4 grid grid-cols-2 max-[400px]:grid-cols-1">
      <div className="h-[85vh] w-[340px] overflow-y-auto">
        {friendOnline.map((items, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-1 w-full flex items-center justify-between mb-3"
            onClick={() => {
              setFriendEmail(items.Email);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={items.profilephoto}
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-100"
                  alt="Profile"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">{items.Name}</span>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
            <div className="flex button gap-2">
              <div
                className="text-[1.5rem] rounded-full"
                onClick={() => {
                  handleCall(items);
                }}
              >
                🎥
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-full max-[400px]:hidden relative">
        {call && (
          <div>
            {CallConnected && (
              <video className="w-full h-[85vh]" autoPlay ref={remoteVedioref} />
            )}
            {!CallConnected && !CallReceived && (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-white">We are Connecting You....</p>
              </div>
            )}
            {CallReceived && (
              <div className="h-[85vh] w-full flex justify-between items-center">
                <div
                  className="px-4 py-2 text-white text-lg font-semibold rounded-full bg-green-500"
                  onClick={handleCallAccepted}
                >
                  Receive
                </div>
                <div
                  className="px-4 py-2 text-white text-lg font-semibold rounded-full bg-green-500"
                  onClick={handleCallDecline}
                >
                  Decline
                </div>
              </div>
            )}
            <video
              className="w-33 h-33 border-2 border-blue-400 absolute right-0 bottom-0 object-cover"
              muted
              draggable
              autoPlay
              ref={localvideoref}
              onDrag={(e) => {}}
            ></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Caller;
