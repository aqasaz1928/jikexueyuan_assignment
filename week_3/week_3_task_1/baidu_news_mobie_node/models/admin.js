/**
 * Created by Joker on 2016/1/4.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminSchema  = new Schema({
    username     : {
        type     : String,
        unique   : true,
        required : true
    },
    token        : {
        type     : String,
        required : true
    },
});

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;