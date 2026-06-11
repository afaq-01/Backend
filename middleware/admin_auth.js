import jwt from 'jsonwebtoken';

const Admin_auth = (req, res, next) => {
    try {
        
        const {token} = req.headers;
        if (!token) {
            return res.json({sucess:false,message:"token problem"})
            
        }
        
        const token_decoding= jwt.verify(token,process.env.JWT_SECRET);
        if (token_decoding !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({sucess:false,message:"NOT AUTHORIZED LOGIN AGAIN"})
            
            
        };
        next();
    } catch (error) {
        
    }
}

export default Admin_auth;