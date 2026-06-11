import mongoose from "mongoose";

const Schema= new mongoose.Schema({
    _id:String,
    nam:String,
    price:Number,
    quantity:Number,
    image:Array,
    date:String,
    delivery_info:{
        nam:String,
        lnam:String,
        email:String,
        city:String,
        state:String,
        zip:String,
        country:String,
        num:String,
        payment:String
    }
   

})

const placeOrder_model= mongoose.model('placeOrder',Schema);

export default placeOrder_model;