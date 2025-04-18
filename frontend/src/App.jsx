import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Chat from './components/Chat'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import axios from 'axios'
import {io} from 'socket.io-client';
import User from './components/User'
import Caller from './components/Caller'
import Home from './components/Home'
import EditProfile from './components/EditProfile'


const App = () => {
  const [isAllow, setisAllow] = useState(false)
  const [Email,setEmail]=useState(null)
  const [Userdata,setUser]=useState(null);
   const [friendOnline, setfriendOnline] = useState([]);
   const [friendoffline, setfriendOffline] = useState([]);
 
  const [Socket,setSocket]=useState(null)
  const navigate = useNavigate()
  const CheckAlreadyLoggedin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/isLoggedIn",
        {Credential:true},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setEmail(response.data.Email)
      setUser(response.data.User)
   
      
      
      setisAllow(response.data.message);
    } catch (error) {

      setisAllow(false);
    }
  };
  useEffect(() => {
    CheckAlreadyLoggedin();  
},[])
  useEffect(() => {
   if(isAllow && Email){
    const newSocket = io('http://localhost:8000', {
      withCredentials: true,
      transports: ['websocket']
    });

    newSocket.emit('user-joined',{Email});
      newSocket.on('user-fetching',(data)=>{
      setfriendOffline(data.PrivateUseroffline)
      setfriendOnline(data.PrivateUseronline)
     
})
  
    setSocket(newSocket);

    // Cleanup function
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }
  }, [isAllow,Email]);



  return (
    <div className='pt-8 px-10 h-screen max-[400px]:px-1'>
      {isAllow && <Navbar setisAllow={setisAllow} setfriendOffline setfriendOnline setEmail Socket={Socket} />}
      <Routes>
        <Route 
          path='/Signup'  
          element={isAllow ? <Navigate to='/' /> :<SignUp setisAllow={setisAllow} setEmail={setEmail} Socket={Socket} setUser={setUser}  />} 
        />
        <Route 
          path='/home'  
          element={isAllow ? <Navigate to='/' /> :<Home   />} 
        />
          <Route 
          path='/Profile'  
          element={<EditProfile Email={Email} Socket={Socket}  />} 
        />
        {/* <Route path='/Check' element={<Chat setisAllow={setisAllow} setEmail Socket={Socket} setUser={setUser} />} /> */}
         <Route 
          path='/login' 
          element={isAllow ? <Navigate to='/' /> :<Login setisAllow={setisAllow} setEmail={setEmail} Socket={Socket} setUser={setUser} />} 
        />
        <Route 
          path='/' 
          element={!isAllow ? <Navigate to='/home' /> : <Chat communitygroups={false} Email={Email} friendOnline={friendOnline} friendoffline={friendoffline}  Socket={Socket}/>} 
        />
        <Route 
          path='/Community' 
          element={!isAllow ? <Navigate to='/home' /> : <Chat communitygroups={true} Email={Email}  Socket={Socket} />} 
        />
        <Route 
          path='/user' 
          element={!isAllow ? <Navigate to='/home' /> : <User Socket={Socket} Userdata={Userdata} setfriendOnline={setfriendOnline} Email={Email} />} 
        />
         <Route 
          path='/Call' 
          element={!isAllow ? <Navigate to='/home' /> : <Caller Socket={Socket} friendOnline={friendOnline} Email={Email} />} 
        />
      </Routes>
    </div>
  )
}

export default App