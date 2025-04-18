import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({setisAllow,Socket,setfriendOffline ,setfriendOnline}) => {
  const [routeSelected, setrouteSelected] = useState('Chat')
  const navigate = useNavigate()
  const refroute = useRef(null)
  const handleLogout=async ()=>{
    try{
        if(Socket){
          Socket.disconnect()
        }
       await axios.post('http://localhost:8000/Logout', {},{
      withCredentials: true
    
           });
    setisAllow(false);
    setfriendOffline([])
    setfriendOnline([])
    navigate('/Signup');
  }catch(error){
    console.log('logout error',err)
  }
}
  

  return (
      <nav className='w-full text-white flex justify-between '>
        <div className="brand">
            Brand
        </div>
        <div className="links flex gap-6 text-sm">
            <Link 
              to="/" 
             
              className={`${routeSelected === 'Chat' ? 'border-b-2 text-blue-600' : ''} border-blue-600 font-[500]`}  
              onClick={(e) => {
                setrouteSelected('Chat')
              }}
            >
              Chat
            </Link>
            <Link 
              to="/Call" 
             
              className={`${routeSelected === 'Call' ? 'border-b-2 text-blue-600' : ''} border-blue-600 font-[500]`}  
              onClick={(e) => {
                setrouteSelected('Call')
              }}
            >
              Call
            </Link>
            <Link 
              to="/user" 
             
              className={`${routeSelected === 'User' ? 'border-b-2 text-blue-600' : ''} border-blue-600 font-[500]`}              onClick={(e) => {
                setrouteSelected('User')
              }}
            >
              User
            </Link>
            <Link 
              
             
              className={`${routeSelected === 'Log-Out' ? 'border-b-2 text-blue-600' : ''} border-blue-600 font-[500]`} onClick={(e) => {
                setrouteSelected('Log-Out');

                handleLogout()
              }}
            >
              Log Out
            </Link>
        </div>
      </nav>
  )
}

export default Navbar
