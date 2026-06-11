import express from 'express';


import { addto_cart,update_cart,get_cart, delete_cart, decrease_quantity } from './cartController.js';

const cartRouter= express.Router();

cartRouter.post('/get',get_cart)
cartRouter.post('/add',addto_cart)
cartRouter.post('/update',update_cart)
cartRouter.post('/delete',delete_cart)
cartRouter.post('/decrease',decrease_quantity)



export{cartRouter};
