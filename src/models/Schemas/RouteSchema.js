var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RouteSchema = new Schema({
  idUser: String,
  waypoints : Array,
  dateInserted: Date,
});
module.exports = mongoose.model('Routes', RouteSchema);