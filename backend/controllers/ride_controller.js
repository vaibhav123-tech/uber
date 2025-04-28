const ride_service=require('../services/ride_service');
const map_controller=require('./map_controllers')
const { validationResult } = require('express-validator');
const map_service =require('../services/map_service');
const {sendMessageToSocketId}=require('../socket');
const ride_model = require('../models/ride_model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userId,  pickup, destination, vehicleType } = req.body;
 
    try {
        const ride = await ride_service.createRide({ user:req.user._id, pickup, destination, vehicleType });
        console.log(ride);
        

        const pickup_coordinates= await map_service.getMapCoordinates(pickup);
        console.log("🚀 Pickup Coordinates:", pickup_coordinates);

    if (!pickup_coordinates || !pickup_coordinates.lat || !pickup_coordinates.lng) {
    return res.status(400).json({ message: "Invalid pickup location" });
    }
        const captains_available= await map_service.getCaptainsInTheRadius(pickup_coordinates.lat,pickup_coordinates.lng,300);
        console.log(captains_available.length);
        ride.otp = ""

        const rideWithUser = await ride_model.findOne({ _id: ride._id }).populate('user');

        captains_available.map(captain => {
            console.log(captain);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
        res.status(201).json(ride);
    
    }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    };  
module.exports.getFare = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { pickup, destination } = req.query;
    
        try {
            const fare = await ride_service.getFare(pickup, destination);
            return res.status(200).json(fare);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };
module.exports.confirm = async (req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const {rideId}= req.body;
    try{
        const ride = await ride_service.confirming_ride({rideId, captain: req.captain});
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
            return res.status(200).json(ride);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
module.exports.start_ride=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId,otp}=req.query;
    try{
        const response=await ride_service.starting_ride({rideId,otp,captain: req.captain});
        console.log(response);
        console.log('Response:', response);
        console.log('Response.user:', response?.user);
        console.log('Response.user.socketId:', response?.user?.socketId);

        sendMessageToSocketId(response.user.socketId, {
            event: 'ride-started',
            data: response
        })

    return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.end_ride=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId}=req.body;
    try{
        const response=await ride_service.ending_ride({rideId,captain:req.captain});
        sendMessageToSocketId(response.user.socketId,{
            event:'ride-ended',
            data:response
        })
        console.log(response,'yeh hai voh response jo tu dekkhna chah rha hai ');
        return res.status(200).json(response);
    }catch (err) {
        return res.status(500).json({ message: err.message });
    }
}