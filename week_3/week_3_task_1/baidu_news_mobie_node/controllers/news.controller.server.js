/**
 * Created by Joker on 2016/1/4.
 */
require('../models/mongodb');
var News = require('../models/news');
var Admin = require('../models/admin');
//服务器端的控制脚本，可以执行一些需要安全认证的操作

module.exports = {

    findAll : function(req, res){
              News.find({},function(err, docs){
                  if(err){res.end(err);}
                    res.json(docs);
              });
    },

    //获得新闻数量
    newsCount   : function (req, res, next) {
        News.find().count(function (err, doc) {
           res.json(doc);
        });
    },

    deleteById  : function (req, res, next) {
        News.remove({_id:req.query.newsId}, function (err, doc) {
            if(err) return next(err);
            res.send("新闻已经被删除!");
        })
    },

    addNews : function(req, res){
        var abstract  = '';
        var newsImg1  = '';
        var newsImg2  = '';
        var newsImg3  = '';
        var newsTitle = req.body['news-title'];
        var newsType  = ((req.body['news-type']).split('-'))[1];
        var subject   = req.body['news-subject'];
        switch (newsType){
            case 'a':
                abstract = req.body['news-abstract'];
                newsImg1 = req.body['img-1'];
                break;
            case 'b':
                abstract = req.body['news-abstract'];
                break;
            case 'c':
                newsImg1 = req.body['img-1'];
                newsImg2 = req.body['img-2'];
                newsImg3 = req.body['img-3'];
                break;
            default :
                break;
        }
        var news = new News({
            title       : newsTitle,
            newsType    : newsType,
            subject     : subject,
            updateTime  : Date.now(),
            abstract    : abstract,
            newsImg1    : newsImg1,
            newsImg2    : newsImg2,
            newsImg3    : newsImg3,
        });
        news.save(function(err){
            if(err) res.end(err);
            res.send("<script> if(confirm('保存成功，继续添加吗？')){window.location.href='/admin/addnews';}else{window.location.href='/admin/list';}</script>");
        })
    },
    //按照要求查找特定位置和特定条数的新闻，可以同时指定新闻类型
    listNews    : function(req, res, next){
        var pageSize    = parseInt(req.query.pageSize, 10) || 15;  //从请求中拿到条数，默认为十条
        var pageStart   = parseInt(req.query.pageStart,10) || 0;    //从请求中拿到起始位置，默认为0
        var subject     = req.subject;                              //新闻类型以参数方式提供
        var findObj     = !!subject?{subject:subject}:{};
        News.find(findObj)
            .skip(pageStart * pageSize)
            .limit(pageSize)
            .sort({updateTime:-1})
            .exec(function (err, docs) {
                docs = JSON.stringify(docs);
                if(err){return next(err);}
                res.render('view.admin.dashboard.html',{
                    docs        : docs,
                    pageStart   : pageStart,
                });

            });
    },
    updateNews  : function (req, res, next) {
        var abstract  = '';
        var newsImg1  = '';
        var newsImg2  = '';
        var newsImg3  = '';
        var newsTitle = req.body['news-title'];
        var newsType  = req.body['news-type'];
        var subject   = req.body['news-subject'];
        switch (newsType){
            case 'a':
                abstract = req.body['news-abstract'];
                newsImg1 = req.body['img-1'];
                break;
            case 'b':
                abstract = req.body['news-abstract'];
                break;
            case 'c':
                newsImg1 = req.body['img-1'];
                newsImg2 = req.body['img-2'];
                newsImg3 = req.body['img-3'];
                break;
            default :
                break;
        }
      News.update({_id:req.query.newsId},{$set :{
          title      : newsTitle,
          subject    : subject,
          abstract   : abstract,
          newsImg1   : newsImg1,
          newsImg2   : newsImg2,
          newsImg3   : newsImg3,
          updateTime : Date.now(),

      }}, function (err) {
          if(err) return next(err);
            res.send("<script>if(confirm('修改成功')){window.location.href='/admin/list';}else{window.location.href='/admin/list';}</script>")
      })
    },

    //通过id得到制定的新闻
    findById    : function(req, res, next){
        var id = req.query.newsId;
        if(!id){return next(new Error('No id'));}

        News.findOne({_id:id})
            .exec(function (err, doc) {
                if(err){return next(err);}
                res.render('view.admin.edit.html',{news:JSON.stringify(doc)});
            });
    },

    //检测用户是否合法
    tokenVerification    : function(req, res, next){
        var username = req.session.username;        //拿到用户保存在会话中的用户名
        if(!!username){
            Admin.findOne({username:username})      //通过用户名为索引查询对应的令牌
                .exec(function(err,data){
                    if(err) return next(err);
                    if((!!data)&&(req.session.token==data.token)){ //当令牌不为空且用户的令牌等于数据库中保存的令牌
                        next();                                    //则用户可继续执行下一步操作
                    }else{
                        console.log('用户信息错误');                  //否则将用户引导至登陆界面
                        res.render('view.admin.login_fail.html');
                    }
                });
        }else{
            res.render('view.admin.login_file.html');
        }
    }

};