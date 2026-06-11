import Admin_auth from '../middleware/admin_auth.js';
import upload from '../middleware/multer.js';
import { add_item, list_product, remove_product, single_product } from './Product-controllers.js';



import express from 'express';

const Product_routes=express.Router();

// the admin_auth present below is a middlwear

Product_routes.post('/add',Admin_auth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1}]),add_item);
Product_routes.post('/remove',Admin_auth,remove_product);
Product_routes.get('/list',list_product);
Product_routes.post('/single',Admin_auth,single_product);

export default Product_routes;
