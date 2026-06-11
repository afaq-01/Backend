import User_models from "../models/user-model.js";
import validator from 'validator'
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

const create_token = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)

}

// Routes for user Login
const User_login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User_models.findOne({ email })
        
        if (!user) {
            res.json({ sucess: false, message: "User does not exists" })

        }

        const isMatch = await bycrpt.compare(password, user.password);
        if (isMatch) {
            const token = await create_token(user._id);
            res.json({ sucess: true, token })

        } else {
            res.json({ sucess: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message })

    }


};

// Routes for user resgistration

const User_register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        // checking user already exists or not

        const exists = await User_models.findOne({ email });
        if (exists) {
            return res.json({ sucess: 'false', message: 'user already exists' })

        }

        // valaditing email format or strong password

        if (!validator.isEmail(email)) {
            return res.json({ sucess: 'false', message: 'Please enter a strong password' })


        }

        if (password.lenght > 8) {
            return res.json({ sucess: 'false', message: 'Please enter a strong password' })


        }

        // hashing user password
        const salt = await bycrpt.genSalt(10);
        const hashing_password = await bycrpt.hash(password, salt);

        const new_user = await User_models({
            name,
            email,
            password: hashing_password
        });

        const user = await new_user.save();

        const token = await create_token(user._id);
        res.json({ sucess: true, token })





    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: error.message })

    }

};

// Routes for user Admin

const User_admin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ sucess: true, token })

        }
        else{
            res.json({sucess:false,message:"INVALID CREDINTIALS"})
        }

    } catch (error) {
        res.json({sucess:false,message:"INVALID CREDINTIALS........."})
        

    }

};

export { User_login, User_register, User_admin };