import Cart_models from '../models/cart-models.js'
import { v2 as cloudinary } from 'cloudinary';
export const addto_cart = async (req, res) => {
  try {
    const { nam, price, image, sizes, Product_id, User_id } = req.body;

    const checking = await Cart_models.findOne({ Product_id, User_id });

    if (checking) {
      return res.json({
        success: false,
        message: "Product already exists",
        item: checking
      });
    }

    const item = new Cart_models({
      User_id,
      Product_id,
      nam,
      price,
      sizes,
      image,
      quantity: 1
    });

    await item.save();

    return res.json({
      success: true,
      message: "Product Added Successfully",
      item
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const get_cart = async (req, res) => {
  try {
    const { User_id } = req.body;

    const userData = await Cart_models.find({ User_id });

    res.json({ success: true, userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const update_cart = async (req, res) => {
  try {
    const { _id } = req.body;
    const item = await Cart_models.findOneAndUpdate(
      { _id },                          // ✅ filter (find item by id)
      { $inc: { quantity: +1 } },      // ✅ update operator
      { new: true }
    );

    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const decrease_quantity = async (req, res) => {
  try {
    const { _id } = req.body;

    const item = await Cart_models.findOneAndUpdate(
      { _id },                          // ✅ filter (find item by id)
      { $inc: { quantity: -1 } },      // ✅ update operator
      { new: true }                    // ✅ return updated document
    );

    res.json({ success: true, item });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const delete_cart = async (req, res) => {
  try {
    const { _id } = req.body;

    await Cart_models.findOneAndDelete({ _id });

    res.send("Product removed");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
