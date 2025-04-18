import React, { useState, useEffect } from "react";

const Community = ({ friendOnline = [], Socket, Email }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [groupMessages, setGroupMessages] = useState({});
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSelectAllFriends = () => {
    const allFriendEmails = friendOnline.map((friend) => friend.Email);
    setSelectedFriends(allFriendEmails);
  };

  const handleCreateGroup = () => {
    if (!groupName || selectedFriends.length === 0) {
      alert("Please provide a group name and select at least one friend.");
      return;
    }

    Socket.emit("create-group", { groupName, members: [...selectedFriends, Email] });
    setGroupName("");
    setSelectedFriends([]);
    setShowModal(false);
    alert("Group created successfully!");
  };

  const handleSendMessage = () => {
    if (!message || !activeGroup) return;

    Socket.emit("send-group-message", {
      groupId: activeGroup.id,
      sender: Email,
      message,
    });

    setMessage("");
  };

  useEffect(() => {
    if (Socket) {
      Socket.on("group-created", (newGroup) => {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
      });

      Socket.on("receive-group-message", (data) => {
        setGroupMessages((prevMessages) => ({
          ...prevMessages,
          [data.groupId]: [...(prevMessages[data.groupId] || []), data],
        }));
      });
    }

    return () => {
      if (Socket) {
        Socket.off("group-created");
        Socket.off("receive-group-message");
      }
    };
  }, [Socket]);

  return (
    <div className="w-full border-[1.4px] rounded border-zinc-400 h-[70vh] p-4 flex">
      <div className="w-1/3 border-r pr-4">
        <h2 className="text-lg font-semibold mb-4">Your Groups</h2>
        <div className="mt-2">
          {groups.map((group, index) => (
            <div
              key={index}
              className={`p-2 border rounded cursor-pointer ${
                activeGroup?.id === group.id ? "bg-blue-200" : "bg-gray-100"
              }`}
              onClick={() => setActiveGroup(group)}
            >
              {group.name}
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Create Group
        </button>
      </div>

      <div className="w-2/3 pl-4">
        {activeGroup ? (
          <div className="h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">{activeGroup.name}</h2>
            <div className="flex-1 overflow-y-auto border p-2 rounded mb-4">
              {(groupMessages[activeGroup.id] || []).map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.sender}:</strong> {msg.message}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border rounded p-2 flex-1"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a group to start chatting</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Create a Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {friendOnline.map((friend, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedFriends.includes(friend.Email) ? "bg-blue-200" : "bg-gray-100"
                  }`}
                  onClick={() => {
                    if (selectedFriends.includes(friend.Email)) {
                      setSelectedFriends(selectedFriends.filter((email) => email !== friend.Email));
                    } else {
                      setSelectedFriends([...selectedFriends, friend.Email]);
                    }
                  }}
                >
                  {friend.Name}
                </div>
              ))}
            </div>
            <button
              onClick={handleSelectAllFriends}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Select All Friends
            </button>
            <button
              onClick={handleCreateGroup}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Create Group
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;