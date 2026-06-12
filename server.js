import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Connectdb from './config/mongodb.js';
import User_router from './controllers/user-routes.js';
import Product_routes from './controllers/Product-routes.js';
import connect_cloudinary from './config/cloudinary.js';
import { cartRouter } from './controllers/cart-router.js';
import {placeOrder_Router} from './controllers/placeOrder_routes.js'

// APP CONFIG
const app = express();
//const port = process.env.PORT || 4000;
Connectdb()
connect_cloudinary()

// middleware

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://frontend-fawn-ten-71.vercel.app"
    ],
    credentials: true
  })
);

//API END POINTS
app.use('/api/user',User_router);
app.use('/api/product',Product_routes);
app.use('/api/cart',cartRouter);
app.use('/api/placeOrder',placeOrder_Router)



app.listen(8080);
