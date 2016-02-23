/**
 * Created by Joker on 2016/1/4.
 */
var mongoose = require('mongoose');
//对mongo进行一些初始化操作
module.exports = function () {
    mongoose.connect('mongodb://localhost/baidunews');
}();