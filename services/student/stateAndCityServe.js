const express = require("express");
const stateCityServe = express.Router();
const { State, City, Country } = require('country-state-city');

//using library name: country-state-city on npm

// serve all the state in india

stateCityServe.get('/get-all-country', async (req, res) => {
  return res.json(Country.getAllCountries());
})

stateCityServe.get('/state/:countryId', async (req, res) => {
  const countryId= req.params.countryId || "IN" ;
  console.log(countryId);
  return res.json(State.getStatesOfCountry(countryId));
})

// serve the city of selected state
stateCityServe.get('/:stateCode/city', async (req, res) => {
  const stateCode = req.params.stateCode;
  console.log(stateCode, 'state code')

  const cityData = City.getCitiesOfState("IN", stateCode);

  for (let i = 0; i < cityData.length; i++) {
    delete cityData[i].countryCode;
    delete cityData[i].stateCode;
    delete cityData[i].latitude;
    delete cityData[i].longitude;
  }

  return res.json(cityData);
})

module.exports = stateCityServe;
