import mongoose from "mongoose";

const product_schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    size: { type: Array, required: true },
    bestseller: { type: Boolean, },
    date: { type: Number, required: true },

})

const product_model= mongoose.models.product || mongoose.model('products',product_schema);

export default product_model;