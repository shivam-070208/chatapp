import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User = ({Email, Userdata, Socket,setfriendOnline}) => {
   const [AllUsers, setAllUsers] = useState([])
   const [Requesteduser, setRequestedUser] = useState([])
   const [Requesteduserreceived, setRequestedUserReceived] = useState([])
   const [activeTab, setActiveTab] = useState('all');

   
   useEffect(() => {
    console.log("hello")
     if (!Socket){
        console.error("Socket is not initialized");
        return;
     } 
     Socket.emit('user-joined', { Email });

     Socket.on('user-fetching', (data) => {
      console.log("all users",data.availableUsers)

       setAllUsers(data.availableUsers);
       setRequestedUser(data.RequestSendUsers);
       setRequestedUserReceived(data.RequestReceivedUsers);
     });

     Socket.on('friend-request-received', (data) => {
        console.log("friend-request-received",data)
       setRequestedUserReceived(prev => [...prev, data]);
     });

     Socket.on('friend-request-accepted', (data) => {
      console.log("friend-request-accepted",data);
      let UserRerenderer = AllUsers.filter(req => req.Email !== data.Email);
      let Requesteduserrendere = Requesteduser.filter(req => req.Email !== data.Email);
      
        if(UserRerenderer){
          setAllUsers([...UserRerenderer]);
          setRequestedUser([...Requesteduserrendere]);
          setfriendOnline(prev => [...prev, data]);
        }
     
     });
  
     return () => {
       Socket.off('user-fetching');
       Socket.off('friend-request-received');
       Socket.off('friend-request-accepted');
     };
   }, [Socket, Email]);

   const sendFriendRequest = (user) => {
    let UserRerenderer = AllUsers.filter(req => req.Email !== user.Email);
    console.log("user",UserRerenderer)
      if(UserRerenderer){
        setAllUsers([...UserRerenderer]);
        setRequestedUser([...Requesteduser, user]);
      }
     Socket.emit('send-friend-request', { senderEmail: Email, receiverEmail:user.Email });
     
   };

   const acceptFriendRequest = (user) => {
    let UserRerenderer = Requesteduserreceived.filter(req => req.Email !== user.Email);
    console.log("user",UserRerenderer)
      if(UserRerenderer){
        setRequestedUserReceived([...UserRerenderer]);
      }
     Socket.emit('accept-friend-request', { senderEmail:Email, receiverEmail: user.Email });
   };

   const renderUserList = () => {
     switch(activeTab) {
       case 'all':
         return AllUsers.map((user, index) => (
           <div key={index} className="user-card flex justify-between items-center p-3 border-b-1  border-b-white">
             <div className="flex items-center gap-3">
               <img src={user.profilephoto} className="w-10 h-10 rounded-full object-cover" alt="" />
               <div className='flex flex-col'>
               <span className="font-semibold text-white">{user.Name}</span>
               <p className='text-xs text-zinc-500'>{user.UserName}</p>
               </div>
             </div>
             {!Requesteduser.find(req => req.Email === user.Email) && 
              <button 
                onClick={() => sendFriendRequest(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add Friend
              </button>
             }
           </div>
         ));
       case 'sent':
         return Requesteduser.map((user, index) => (
           <div key={index} className="user-card flex justify-between items-center p-3 border-b-1 border-b-white">
             <div className="flex items-center gap-3">
               <img src={user.profilephoto} className="w-10 h-10 rounded-full object-cover" alt="" />
               <div className='flex flex-col'>
               <span className="font-semibold text-white">{user.Name}</span>
               <p className='text-xs text-zinc-500'>{user.UserName}</p>
               </div>
             </div>
             <span className="text-gray-500">Pending</span>
           </div>
         ));
       case 'received':
         return Requesteduserreceived.map((user, index) => (
           <div key={index} className="user-card flex justify-between items-center p-3 border-b-1  border-b-white">
             <div className="flex items-center gap-3">
               <img src={user.profilephoto} className="w-10 h-10 rounded-full object-cover" alt="" />
               <div className='flex flex-col'>
               <span className="font-semibold text-white">{user.Name}</span>
               <p className='text-xs text-zinc-500'>{user.UserName}</p>
               </div>
             </div>
             <button 
               onClick={() => acceptFriendRequest(user)}
               className="bg-green-500 text-white px-3 py-1 rounded"
             >
               Accept
             </button>
           </div>
         ));
       default:
         return null;
     }
   };

   return (
     <div className='w-full'>
       <div className="userdata w-full flex gap-3 flex-col justify-center items-center pt-2">
         <img src={Userdata.profilephoto} className='bg-amber-300 object-cover rounded-full w-[100px] h-[100px] mt-4' alt="" />
         <table className=''>
           <tbody>
             <tr>
               <td className='text-sm font-semibold w-[60px] border-1 border-blue-500 text-zinc-600 p-2'>Name</td>
               <td className='text-sm text-center mt-2 border-blue-500 border-1 font-semibold text-zinc-600'>{Userdata.Name}</td>
             </tr>
             <tr>
               <td className='text-sm font-semibold w-[60px] border-1 border-blue-500 text-zinc-600 p-2'>Username</td>
               <td className='text-sm font-semibold text-zinc-600 border-1 p-2 border-blue-500'>{Userdata.UserName}</td>
             </tr>
           </tbody>
         </table>
       </div>
      
       <nav className='w-full flex justify-between gap-4 mt-4 border-zinc-500 border-b-[1.3px]'>
         <div className="buttons flex gap-3 text-sm px-2 font-semibold text-zinc-500">
           <p 
             className={`cursor-pointer ${activeTab === 'all' ? 'text-blue-500' : ''}`}
             onClick={() => setActiveTab('all')}
           >
             All
           </p>
           <p 
             className={`cursor-pointer ${activeTab === 'sent' ? 'text-blue-500' : ''}`}
             onClick={() => setActiveTab('sent')}
           >
             Request Sent
           </p>
           <p 
             className={`cursor-pointer ${activeTab === 'received' ? 'text-blue-500' : ''}`}
             onClick={() => setActiveTab('received')}
           >
             Request Received
           </p>
         </div>
       </nav>

       <div className="users-list mt-4">
         {renderUserList()}
       </div>
     </div>
   )
}

export default User