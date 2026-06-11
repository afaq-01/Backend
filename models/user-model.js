import mongoose from "mongoose";

const user_schema= new mongoose.Schema({
    name:{type:String,required :true},
    email:{type:String,required :true, unique:true},
    password:{type:String,required :true},
    cartdata:{type:Object, default :{}}
},{minimize:false})

const User_models= mongoose.model('/user',user_schema);

export default User_models;