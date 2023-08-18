const express = require("express");
const stateCityServe = express.Router();
const { State, City, Country } = require('country-state-city');

//using library name: country-state-city on npm

// serve all the state in india
stateCityServe.get('/state-by-code-and-country/:country/:stateCode', async (req, res) => {
  try{
    const {stateCode, country} = req.params;
    return res.json(State.getStateByCodeAndCountry(stateCode, country))
  } catch(err) {
    console.log(err, '----------------error is occurring /ingelt/state-city--------------------');
    return res.json([])
  }
})

stateCityServe.get('/get-all-country', async (req, res) => {
  try{
    return res.json(Country.getAllCountries());
  } catch(err) {
    console.log(err, '----------------error is occurring /ingelt/state-city--------------------');
    return res.json([])
  }
})

stateCityServe.get('/state/:countryId', async (req, res) => {
  try{
    const countryId= req.params.countryId || "IN" ;
    return res.json(State.getStatesOfCountry(countryId));
  } catch(err) {
    console.log(err, '----------------error is occurring /ingelt/state-city--------------------');
    return res.json([])
  }
})

// serve the city of selected state
stateCityServe.get('/:stateCode/city', async (req, res) => {
  try{
    const stateCode = req.params.stateCode;
    return res.json(City.getCitiesOfState("IN", stateCode));
  } catch(err) {
    console.log(err, '----------------error is occurring /ingelt/state-city--------------------');
    return res.json([])
  }
})

module.exports = stateCityServe;
