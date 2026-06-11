import placeOrder_model from "../models/placeOrder.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder_add = async (req, res) => {

  try {
    const { productsWithDate, delivery_info } = req.body;
  
    // Step 1: Extract IDs from incoming products
      const ids = productsWithDate.map(item => item._id);
  
      // Step 2: Find existing IDs in DB
      const existingDocs = await placeOrder_model.find({ _id: { $in: ids } });
      const existingIds = existingDocs.map(doc => doc._id.toString());
  
      // Step 3: Modify duplicates and merge `obj` into each product
      const finalProducts = productsWithDate.map(item => {
        let newId = item._id.toString();
        if (existingIds.includes(newId)) {
          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          newId += "-" + randomSuffix;
        }
  
        return {
          ...item,
          _id: newId,
          delivery_info  // ✅ NEST delivery info properly
        };
      });
  
      // Step 4: Insert one by one
      for (const item of finalProducts) {
        const newDoc = new placeOrder_model(item);
        await newDoc.save();
      }
  
      res.status(200).json({
        message: "All products inserted successfully with delivery info",
      });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};




const placeOrder_get = async (req, res) => {
  try {

    const data = await placeOrder_model.find();
    res.send(data)


  } catch (error) {
    res.send(error.message)

  }
};

const placeOrder_payment = async (req,res) => {

  try {

    const { productsWithDate } = req.body;

     const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: productsWithDate.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.nam,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/place-order',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });

  
  } catch (error) {
     console.error("Stripe Error:", error);
  }



}

export { placeOrder_get, placeOrder_add, placeOrder_payment };