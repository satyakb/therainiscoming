var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
var request = require('request');
var schedule = require('node-schedule');

module.exports = function() {
  return new function() {
    var self = this;
    var rule = new schedule.RecurrenceRule();
    rule.hour = 21;
    rule.minute = 0;

    var yoUrl = 'http://api.justyo.co/yo/';
    var yoParams = {
      'api_token': '1521e7c5-98c6-4403-a207-f055bb096e12'
    };

    this.startScheduler = function() {
      schedule.scheduleJob(rule, function() {
        console.log('scheduler!!!');
        self.getAllWeather();
      });
    }

    var key = "&APPID=40a7c48358c34839dac9458f199fd90c";

    self.getAllWeather = function() {
        User.find({}, function(err, users) {
            users.forEach(function(user) {
                console.log(user.username);
                self.getWeather(user);
            })
        });
    }

    self.getWeather = function(user) {
      var lat = user.location.lat;
      var lon = user.location.lon;
      var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?cnt=2&mode=json&lat=' + lat + '&lon=' + lon + key;
      request(weatherUrl, function(err, resp, body) {
        console.log(err, body);
        var status = JSON.parse(body).list[1].weather[0].main.toLowerCase();
        if (status == 'rain') {
          self.sendYo(user.username);
        }
      })
    }

    self.sendYo = function(username) {
      yoParams.username = username;
      console.log(yoParams);
      request.post({url:yoUrl, formData: yoParams}, function(err, httpResponse, body) {
        if (err) {
          console.log('Error sending yo: ', err);
        }
      });
    }
  }
}