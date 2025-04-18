import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = ({setisAllow,setEmail,setUser}) => {
    const navigate = useNavigate();
    const [message, setmessage] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        Password: '',
        Email: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:8000/Signin', {
                Email: formData.Email,  
                Password: formData.Password,
                Name: formData.name, 
                UserName: formData.username
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
            
            if (result.data.SignIn) {
                setisAllow(true);
                setEmail(result.data.Email)
                setUser(result.data.User)

                navigate("/");  
            } 
            setmessage(result.data.message);
            
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response) {
                setmessage(error.response.data.message);
            } else {
                setmessage("An error occurred during signup");
            }
        }
    };
return (
    <div className='w-full h-full grid place-items-center'>
        <div className='w-[300px] h-[400px] SignCard backdrop-blur-6xl' style={{ backgroundColor: 'transparent' }}>
            <form className="flex flex-col  p-4" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-3 text-center text-blue-600">Sign Up</h2>
                <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleChange} className='w-full px-3 py-2 border outline-none border-gray-300 text-white placeholder:text-zinc-400 rounded-md focus:outline-none  ' />
                <input
                    type="text"
                    placeholder="Username" name='username' value={formData.username} onChange={handleChange} 
                    className="w-full px-3 py-2 mt-2 border outline-none text-white placeholder:text-zinc-400  border-gray-300 rounded-md focus:outline-none  "
                    required 
                />
                
                <input
                    type="email"
                    placeholder="Email" name='Email' value={formData.Email} onChange={handleChange}
                    className="w-full px-3 mt-2 py-2 lowercase border outline-none text-white placeholder:text-zinc-400  border-gray-300 rounded-md focus:outline-none  "
                    required
                />
                
                <input
                    type="password"
                    placeholder="Password" name='Password' value={formData.Password} onChange={handleChange}
                    className="w-full px-3 py-2 border mt-2 outline-none border-gray-300 text-white placeholder:text-zinc-400  rounded-md focus:outline-none  "
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}"
                    title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                    required 
                />
                 <p className='text-red-500 text-xs'>{message}</p>
                <button
                    type="submit"
                    className="w-full px-3 py-2 mt-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Sign Up
                </button>
                <p className="text-sm text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    </div>
)
}

export default SignUp
