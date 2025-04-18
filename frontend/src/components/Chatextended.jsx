import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatextended = ({currentUser, Socket, Email,setlastMessage}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
  
    const chatIdchanger = [Email, currentUser.Email].sort().join('_');
    setChatId(chatIdchanger);
  
    setMessages([]);
   
    fetchMessages();
  }, [currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };



  

  useEffect(() => {
    if (Socket) {
      Socket.on('receive-message', (data) => {
        const { senderId, receiverId, message } = data;
        if ((senderId === Email && receiverId === currentUser.Email) ||
            (senderId === currentUser.Email && receiverId === Email)) {
          setMessages(prev => [...prev, message]);
        }
      });

      Socket.on('user-typing', (data) => {
        const { senderId, receiverId } = data;
        if (senderId === currentUser.Email && receiverId === Email) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1000);
        }
      });

    
      fetchMessages();
    }

    return () => {
      if (Socket) {
        Socket.off('receive-message');
        Socket.off('user-typing');
      }
    };
  }, [Socket, Email, currentUser.Email]);

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async () => {
    try {
      
      const response = await axios.post(`http://localhost:8000/chat`, {
        senderId: Email,
        receiverId: currentUser.Email     },{
        credentials: 'include'
      });
     
     
      setMessages(response.data.messages || []);
     
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = () => {
    if (newMessage.trim() && Socket) {
     
      Socket.emit('send-message', {
        message: newMessage.trim(),
        senderId: Email,
        receiverId: currentUser.Email
      });
      setMessages(prev => [ ...prev, { message: newMessage.trim(), sender: Email, timestamp: new Date().toISOString() }]);
      
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    Socket?.emit('typing', {
      senderId: Email,
      receiverId: currentUser.Email
    });
  };

  return (
<div className='w-full max-h-[80vh] h-full border-1 overflow-scroll relative rounded-md border-amber-100 flex  flex-col'>
        <nav className='bg-blue-500 rounded-b-[50%] sticky rounded-md w-full flex pt-2 z-3 px-2 min-h-[60px]'>
        <div className="userinfo flex">
          <img src={currentUser.profilephoto} className='rounded-[50%] bg-white object-cover w-7 h-7' alt="" />
          <div className='flex flex-col gap-[-9px] ml-2'>
            <p className='text-sm text-white'>{currentUser.Name}</p>
            {isTyping && <p className='text-xs text-white'>typing...</p>}
          </div>
        </div>
      </nav>

      <div className='chatarea text-white h-[calc(100%-100px)] overflow-y-auto px-2 py-2'>
  {messages.map((msg, index) => (
    <div key={index} className={`w-full flex ${msg.sender === currentUser.Email ? 'justify-start' : 'justify-end'} mb-2`}>
      <p className={`${msg.sender === currentUser.Email ? 'bg-blue-700' : 'bg-green-700'} max-w-[40%] text-[0.9rem] p-2 rounded-xl ${msg.sender === currentUser.Email ? 'rounded-tl-[0px]' : 'rounded-tr-[0px]'}`}>
        {msg.message}
     
      </p>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>

      <div className='inputarea w-full flex bg-blue-700 h-[40px] rounded-b-md'>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className='w-[90%] h-full rounded-bl-md text-black placeholder:text-black placeholder:text-xs caret-white outline-none border-b-1 px-2 text-sm pb-1' 
          placeholder='Type your message here...'
        />
        <button 
          onClick={handleSend}
          className='w-[10%] h-full rounded-br-md flex justify-center items-center hover:bg-blue-800 text-white'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatextended;