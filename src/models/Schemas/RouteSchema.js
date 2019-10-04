var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RouteSchema = new Schema({
  idUser: {
    type:String,
    unique:false,
    index: true,
  },
  waypoints : Array,
  title: String,
  dateInserted: Date,
});
module.exports = mongoose.model('Routes', RouteSchema);