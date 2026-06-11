import express from 'express';
import { placeOrder_add,placeOrder_get,placeOrder_payment } from './placeOrder_controllaer.js';


const placeOrder_Router= express.Router();

placeOrder_Router.get('/placeOrder_get',placeOrder_get)
placeOrder_Router.post('/placeOrder_add',placeOrder_add)
placeOrder_Router.post('/placeOrder_payment',placeOrder_payment)





export{placeOrder_Router};