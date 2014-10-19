var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
var request = require('request');
var scripts = require('../scripts')();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'THERAINISCOMING', path: req.originalUrl });
});

router.get('/test', function(req, res) {
  res.send(200);
})

router.get('/subscribe', function(req, res) {
  console.log(req.query);

  if (req.query.username && req.query.location) {
    var username = req.query.username;
    var location = req.query.location.split(';');

    var query = {username: username};
    User.findOneAndUpdate(query, {location: {lat: location[0], lon: location[1]}}, {upsert: true}, 
      function (err, user) {
        if (err) {
          console.log('Error adding user: ' + err);
          return res.send(500);
        } else {
          console.log(user);
          setTimeout(function() {
            scripts.getWeather(user);
          }, 5000);
          return res.send(200);
        }
      }
    );

  } else {
    console.log('Invalid query');
    return res.send(400);
  }

});

module.exports = router;
