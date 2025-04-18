import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setisAllow,setUser}) => {
  const navigate = useNavigate();
  const [message,setmessage]= useState()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
let result;
  const CheckLogin = async (e) => {
    e.preventDefault(); 
    try{
   result=await axios.post('http://localhost:8000/Login',  {
        Email: formData.username,  
        Password: formData.password
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      

        if (result.data.Login) {
          setisAllow(true)
          setEmail(result.data.Email)
          setUser(result.data.User)
          navigate('/');
        } else {
          setmessage(result.data.message)
        }
      }catch(error) {
        if(error.response){

          setmessage(error.response.data.message);
          console.log(error.response.data.message)
        
        }
      };
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div
        className="w-[300px] h-[400px] SignCard backdrop-blur-6xl"
        style={{ backgroundColor: 'transparent' }}
      >
        <form
          className="flex flex-col items-center justify-center h-full"
          onSubmit={CheckLogin}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            className="w-[80%] p-2 mb-4 text-white placeholder:text-zinc-400  border outline-none border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-[80%] p-2 mb-4 border lowercase outline-none text-white placeholder:text-zinc-400  border-gray-300 rounded"
          />
           <p className="text-sm text-center text-red-500">
           {message}
            
          </p>
          <button
            type="submit"
            className="w-[80%] p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/SignUp" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
