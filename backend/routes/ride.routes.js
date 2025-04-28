const express=require('express');
const router=express.Router();
const { body, query } = require('express-validator');
const auth_middleware = require('../middleware/auth_middleware');
const rideController = require('../controllers/ride_controller');

router.post('/create',
    auth_middleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    rideController.createRide
);
router.get('/get-fare',
    auth_middleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)
 
router.post('/confirm',
    auth_middleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirm
)

router.get('/start-ride',
    auth_middleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.start_ride
)
router.post('/end-ride',
    auth_middleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.end_ride
)

module.exports=router;