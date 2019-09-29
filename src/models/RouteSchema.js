var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RouteSchema = new Schema({
  idUser: String,
  waypoins : Array,
  dateCreate: Date,
});
module.exports = mongoose.model('Routes', RouteSchema);