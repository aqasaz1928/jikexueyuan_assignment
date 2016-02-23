var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/news.controller.client');
/* GET home page. */
router.param('subject', function (req, res, next, subject) {
    req.subject = subject;
    next();
});
//访问主页渲染模版
router.get('/', function (req, res, next) {
    res.render('index.html');
});

//list路径下，可以查询新闻，也可以提供subject参数来指定新闻的类型
router.get('/list', function (req, res, next) {
    ctrl.listNews(req, res, next);
});
router.get('/list/:subject', function (req, res, next) {
    ctrl.listNews(req, res, next);
});

//router.use(function (req, res, next) {
//    next(new Error('没有找到页面'));
//});

module.exports = router;
