var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * User Schema
 */
var UserSchema = new Schema({
  username: {type: String, unique: true},
  location: {
    lat: Number,
    lon: Number
  }
});

mongoose.model('User', UserSchema);