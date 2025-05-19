const express = require('express');
const router = express.Router()
const UserModel = require('../mongoDB/models/Usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ChatModel = require('../mongoDB/models/Chat');
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dgjj8wywd",
    api_key: "723899718963238",
    api_secret: "0kZ_YxITan78d1HiqiHWNI-CjwM", 
  });

  const storage = multer.memoryStorage(); 
   const upload = multer({ storage });
  
  router.post("/api/update-profile", upload.single("ProfilePhoto"), async (req, res) => {
    const { Email, Name, UserName } = req.body;
  
    try {
      
      const user = await UserModel.findOne({ Email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      let profilePhotoUrl = user.profilephoto; 
  
    
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "profile_photos" }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
  
        profilePhotoUrl = result.secure_url; 
      }
  
      
      user.Name = Name || user.Name;
      user.UserName = UserName || user.UserName;
      user.profilephoto = profilePhotoUrl;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user: {
          Name: user.Name,
          UserName: user.UserName,
          ProfilePhoto: user.profilephoto,
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, message: "Failed to update profile." });
    }
  });


router.post('/Signin', async (req, res) => {
    const { Name, UserName, Email, Password } = req.body;
    console.log("5reqwjej")
    try {
        // Check both Email and UserName
        const emailExists = await UserModel.findOne({ Email });
        const usernameExists = await UserModel.findOne({ UserName });

        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (usernameExists) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const CreatedUser = await UserModel.create({
            Name: Name,
            Email: Email,
            UserName: UserName,
            Password: hashedPassword
        });
        console.log("done")
        const token = jwt.sign({ Email }, "webdevthejacker", { expiresIn: '1000h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24
        });

      
        res.status(200).json({ message: "User created successfully", SignIn: true,Email:Email,User:CreatedUser });

    } catch (err) {
        console.log('unable to create user ', err);
        // Handle MongoDB duplicate key error

        res.status(500).json({ message: "Server error", SignIn: false });
    }
});


router.post('/Login', async (req, res) => {
    
    const { Email, Password } = req.body;
    try {
        const user = await UserModel.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User with  email not found", Login: false });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", Login: false });
        }

        const token = jwt.sign({ Email }, "webdevthejacker", { expiresIn: '1000h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24
        });
        res.status(200).json({ message: "Login successful", Login: true ,Email:Email,User:user});
    } catch (err) {
        console.log('unable to login user ', err);
        res.status(500).json({ message: "Server error" });
    }
});
router.post('/isLoggedIn', async (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(201).json({ message: false });
    }

    try {
        const decoded = jwt.verify(token, "webdevthejacker");
        if (!decoded.Email) {
            return res.status(201).json({ message: false });
        }
        const Email=decoded.Email;

        const user = await UserModel.findOne({ Email: Email });
        if (!user) {
            res.clearCookie('token');
            return res.status(201).json({ message: false });
        }

        return res.status(200).json({ message: true,Email:Email,User:user });

    } catch (err) {
        console.log('Invalid token ', err);
        res.clearCookie('token');
        return res.status(400).json({ message: false });
    }
});

router.post('/Logout', (req, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: "Logout successful" });
});
router.get('/',(req,res)=>{
    res.send("hello")
})

router.post('/chat', async (req, res) => {
    try {
        const {receiverId,senderId} = req.body
        const chatId = [receiverId, senderId].sort().join('_');
        console.log(chatId)          
        const chatData = await ChatModel.findOne({ ChatId: chatId });
        if (!chatData) {
            
            return res.status(404).json({ message: [] });
        }
        console.log(chatData)
        const messages = chatData.Messages.map(message => {

            return {
                message: message.message,
                sender: message.sender,
                timestamp: message.timestamp
            };
        });
        
        res.status(200).json({ messages });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});





module.exports = router;
