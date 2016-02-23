/**
 * Created by Joker on 2016/1/4.
 */
require('../models/mongodb');
var News = require('../models/news');
//服务端的控制脚本，用来执行查询等不需要安全验证的操作
module.exports = {

    //查找所有新闻
    findAll     : function(req, res, next){
        News.find({}).sort({updateTime:-1}).exec(function(err, docs){
            if(err){return next(err);}
            res.json(docs);
        });
    },

    //按照要求查找特定位置和特定条数的新闻，可以同时指定新闻类型
    listNews    : function(req, res, next){
        var pageSize    = parseInt(req.query.pageSize, 10) || 10;  //从请求中拿到条数，默认为十条
        var pageStart   = parseInt(req.query.pageStart,10) || 0;    //从请求中拿到起始位置，默认为0
        var subject     = req.subject;                              //新闻类型以参数方式提供
        var findObj     = !!subject?{subject:subject}:{};
        News.find(findObj)
            .skip(pageStart * pageSize)
            .limit(pageSize)
            .sort({updateTime:-1})
            .exec(function (err, docs) {
                if(err){return next(err);}
                res.json(docs);
            });
    },

    //通过id得到制定的新闻
    findById    : function(req, res, next, id){
        if(!id){return next(new Error('No id'));}

        News.findOne({_id:id})
            .exec(function (err, doc) {
                if(err){return next(err);}
                res.json(doc);
            });
    }
};