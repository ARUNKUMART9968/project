const usermodel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = async (req, res)=>{
    try{
        const{name, email, password} = req.body;
        const user = await usermodel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:'user already exists' , success : false})
        }
        const userModel = new usermodel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch(err){
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ "message": errorMsg, "success": false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ "message": errorMsg, "success": false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
module.exports = {
    signup,
    login
}