const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user_model =require('../models/user_model');
const blacklistToken =require('../models/blacklistToken_model');
const captainModel=require('../models/captain_model');

module.exports.authUser = async (req, res, next)=>{
    const token=req.cookies || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){res.status(401).json({message:"anauthorised"})};
    const isblacklistedtoken=await blacklistToken.findOne({token:token});
    if(isblacklistedtoken){res.status(401).json({message:"anauthorised"})};
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user = await user_model.findOne({ _id: decoded._id });
        req.user=user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    } 
}
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistToken.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}