require('dotenv').config();
const mongoose = require('mongoose');

const connectDB=async ()=>{
mongoose.set('strictQuery',true);
    try{
          const conn= await mongoose.connect("mongodb://localhost:27017/ChatApp");
          console.log(`mongoodb connected ${conn.connection.host}`)
    }catch(err){
            console.log(`connection failed ${err}`)
    }


}
module.exports=connectDB;