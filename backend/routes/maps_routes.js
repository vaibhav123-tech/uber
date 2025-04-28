const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware');
const { query } = require('express-validator');
const Map_controller = require('../controllers/map_controllers'); // Correct Import

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    auth_middleware.authUser,
    Map_controller.getCoordinates  // Correct Reference
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    auth_middleware.authUser,
    Map_controller.getDistanceTime  // Correct Reference
);

router.get('/get-suggestions',
    query('input').isString(),
    auth_middleware.authUser,
    Map_controller.getAutoCompleteSuggestions
);

module.exports = router;
