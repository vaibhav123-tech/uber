const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user_model =require('../models/user_model');
const blacklistToken =require('../models/blacklistToken_model');

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