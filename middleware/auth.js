import jwt from 'jsonwebtoken';

const auth_user = (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return {success:false, message:'NOT AUTHORIZED LOGIN AGAIN'}
        
    }

    try {

        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
        
    }

};

export {auth_user};