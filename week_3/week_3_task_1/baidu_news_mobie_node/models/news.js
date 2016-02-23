/**
 * Created by Joker on 2016/1/4.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义news的模型
var NewsSchema = new Schema({
    title       : {
        type    : String,
        required: true,
        index   : true,
        trim    : true
    },
    newsType    : {
        type    : String,
        enum    : ['a','b','c'],
        required: true
    },
    subject     : String,
    updateTime  : Date,
    abstract    : String,
    newsImg1    : String,
    newsImg2    : String,
    newsImg3    : String,
});

var News =  mongoose.model('News',NewsSchema);
module.exports = News;
