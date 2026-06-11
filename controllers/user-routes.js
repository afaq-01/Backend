import express from 'express';
import { User_admin,User_register,User_login } from './user-controllers.js';

const User_router=express.Router();

User_router.post('/register',User_register);
User_router.post('/admin',User_admin);
User_router.post('/login',User_login);

export default User_router;