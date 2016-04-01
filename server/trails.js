var http = require('http');
var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var config = require('./config');
var utilities = require('./utility.js');
var app = express();

exports.allTrails = function(req, res) {
  
  var city = req.query.city;
  var state = req.query.state;
  // var city = 'Jackson';
  // var state = 'Wyoming';
  axios({
    method: 'get',
    url: 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]=' + city + '&q[state_cont]=' + state,
    headers: {'X-Mashape-Key': config.TRAILS.API_KEY}
  })
  .then(function(allTrails){
    //console.log('we got the data',allTrails)
    var cleanData = utilities.cleanTrails(allTrails);
    res.json(cleanData);
  })
}

exports.singleTrail = function(req, res) {
  
  var id = req.query.unique_id;
  // var city = 'Jackson';
  // var state = 'Wyoming';
  axios({
    method: 'get',
    url: 'https://trailapi-trailapi.p.mashape.com/?q[unique_id_eq]=' + id,
    headers: {'X-Mashape-Key': config.TRAILS.API_KEY}
  })
  .then(function(trail){
    //console.log('we got the data', trail)
    var cleanData = utilities.cleanTrails(trail);
    res.json(cleanData);
  })
}