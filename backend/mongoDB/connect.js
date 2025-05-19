require('dotenv').config();
const mongoose = require('mongoose');

const connectDB=async ()=>{
mongoose.set('strictQuery',true);
    try{
          const conn= await mongoose.connect("mongodb+srv://shvgpt070208:Bts2314@cluster1.rx5hjff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");
          console.log(`mongoodb connected ${conn.connection.host}`)
    }catch(err){
            console.log(`connection failed ${err}`)
    }


}
module.exports=connectDB;