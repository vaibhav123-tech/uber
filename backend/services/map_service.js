const axios = require("axios");
const captainModel = require("../models/captain_model");

const getMapCoordinates = async (address) => {
  const API_KEY = process.env.GOOGLE_MAPS_API;
  const BASE_URL = "https://maps.gomaps.pro/maps/api/geocode/json";

  const url = `${BASE_URL}?address=${encodeURIComponent(address)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.results[0].geometry.location;
    } else {
      throw new Error(`Error fetching coordinates: ${response.data.status}`);
    }
    
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

const getDistanceTime = async (origin, destination) => {
  const API_KEY = process.env.GOOGLE_MAPS_API;
  const BASE_URL = "https://maps.gomaps.pro/maps/api/distancematrix/json";

  const url = `${BASE_URL}?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);

    const element = response.data.rows[0].elements[0];

    // ✅ Check element status correctly
    if (element.status === "OK") {

      return {
        distance: element.distance.value,  // Distance in meters
        duration: element.duration.value   // Duration in seconds
      };
    } else {
      throw new Error(`Error fetching distance: ${element.status}`);
    }
  } catch (error) {
    console.error("❌ API request failed:", error.message);
    throw error;
  }
};

module.exports = { getDistanceTime };



const getSuggestions = async (input) => {
  const API_KEY = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions; // Returns suggested places
    } else {
      throw new Error(`Error fetching place suggestions: ${response.data.status}`);
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  if (ltd == null || lng == null) {
    throw new Error("Invalid coordinates provided for searching captains.");
}
  const captains = await captainModel.find({
      location: {
          $geoWithin: {
              $centerSphere: [ [ ltd, lng ], radius / 6371 ]
          }
      }
  });
  return captains;
}

module.exports = { getSuggestions,getMapCoordinates,getDistanceTime,getCaptainsInTheRadius };
