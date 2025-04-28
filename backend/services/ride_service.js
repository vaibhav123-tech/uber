const map_service = require('./map_service');
const rideModel = require('../models/ride_model');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    
    const distanceTime = await map_service.getDistanceTime(pickup, destination);

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Invalid response from map service');
    }

    const baseFare = { auto: 10, car: 20, moto: 15 };
    const perKmRate = { auto: 5, car: 8, moto: 6 };
    const perMinuteRate = { auto: 1, car: 2, moto: 1.5 };

    const distance = distanceTime.distance;
    const duration = distanceTime.duration;

    if (typeof distance !== 'number' || typeof duration !== 'number') {
        throw new Error("Distance or duration is invalid");
    }

    const fare = {
        auto: Math.round(baseFare.auto + ((distance / 1000) * perKmRate.auto) + ((duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distance / 1000) * perKmRate.car) + ((duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distance / 1000) * perKmRate.moto) + ((duration / 60) * perMinuteRate.moto))
    };

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    try {
        const fare = await getFare(pickup, destination);

        if (!fare[vehicleType] || isNaN(fare[vehicleType])) {
            throw new Error('Calculated fare is invalid');
        }

        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            otp:getOtp(6),
            fare: fare[vehicleType]
        });

        return ride;
    } catch (error) {
        console.error('Error creating ride:', error.message);
        throw error;
    }
};
module.exports.confirming_ride = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}
module.exports.starting_ride = async ({rideId,otp,captain})=>{
    console.log("Starting ride service called with:", { rideId, otp, captain });
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');
    console.log('Fetched Ride:', ride); 
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}
module.exports.ending_ride=async({rideId,captain})=>{
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }
    console.log('ye chl rha h dekkh ek baar')
    const resp=await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        
        status: 'completed'

    })
    console.log('ab yeh dekh ',resp)
    return ride;
}