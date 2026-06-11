import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  User_id: String,
  Product_id: String,
  nam: String,
  price: Number,
  sizes: Array,
  image: Array,
  quantity: {
    type: Number,
    default: 1
  }
});

const Cart_models = mongoose.model("Cart", cartSchema);

export default Cart_models;