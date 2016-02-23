var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var multer = require('multer');         //引入multer扩展来操作表单提交文件
var upload = multer({dest:'./upload/'});//指定上传文件的路径
var nodegrass = require('nodegrass');   //引入nodegrass模块来从用户输入的url地址直接获取文件

var ctrl = require('../controllers/news.controller.server');

router.use(cookieParser());
router.use(session({
    secret  : '123456asdfg',
    //name    : 'test',
    cookie  : {maxAge: 36000000 }, //设置过期时间为一小时
    resave  : false,
    saveUninitialized   : true,
}));

//定义一个中间件，在执行一些需要权限的操作时查询
function adminVerify(req, res, next) {
    var reqUrl = req.baseUrl + req.url;
    if (!!req.session) {
        if ((!!req.session.username) && (!!req.session.token)) {
            //当用户登录过，并在会话之中保存有用户名和令牌时向数据库查询
            ctrl.tokenVerification(req, res, next);
        } else {
            res.render('view.admin.login_fail.html');
        }
    } else {
        res.json('浏览器不支持登陆');
    }

}



//用户访问后台登陆界面
router.get('/', function (req, res, next) {
    res.render('view.admin.login.html');
});
//用户提交登陆表单
router.post('/login', function (req, res, next) {
    if(req.session){
        req.session.username = req.body.username;           //将用户提交的用户名保存入会话中
        var password = req.body.password;
        var tokenData = req.body.username+'salt'+password;  //令牌的计算需要用户名加盐加密码
        req.session.token = getMd5Hash(tokenData);          //通过计算获得用户对应的的令牌
        res.redirect('./list');                             //然后重定向至数据列表界面
    }else{
        res.send('浏览器不支持登陆');
    }



});



router.get('/list',adminVerify, function(req, res, next){
    ctrl.listNews(req, res, next);
    //res.json(req.session.test);
});


router.get('/addnews', adminVerify,function (req, res, next) {
    res.render('view.admin.addnews.html');
});
router.post('/addnews', adminVerify,function (req, res, next) {
    ctrl.addNews(req, res, next);
});


router.get('/newscount', adminVerify,function (req, res, next) {
   ctrl.newsCount(req, res, next);
});


router
    .get('/edit', adminVerify,function (req, res, next) {
   ctrl.findById(req, res, next);
});
router.post('/edit', adminVerify,function (req, res, next) {
   ctrl.updateNews(req, res, next);
});


//当用户通过表单提交本地文件上传时，使用multer提供的方法以中间件的形式来处理文件数据
router.post('/upload', adminVerify,upload.single('img-file') ,function (req, res, next) {
    //引入fs模块进行文件操作
    var fs = require('fs');
    console.log(req.file);
    var fileName = req.file.originalname.split('.');   //将文件名以.分隔开
    var oldpath = req.file.path;                        //获取文件临时存放的路径
    var fileType = fileName[fileName.length-1];         //获取稳健的扩展名
    if(!fileIsImage(fileType)){                         //通过方法确定文件为合法类型
        res.json('file is not a supported img file');
        return;
    }
    fs.readFile(oldpath, function (err, data) {         //读取文件内容以便计算摘要
        if(err) return err;
        var despath = './public/images/'+getMd5Hash(data)+'.'+fileType;  //计算文件摘要来命名文件
        fs.rename(oldpath,despath,function (err) {
            if(err) res.json(err);
            res.json(despath);                  //将文件存放的路径返回
        });
    });
});

//当用户提交外部图片的URL时
router.post('/getImg', adminVerify,function (req, res, next) {

    var imgUrl = req.body.imgUrl;                               //获得用户提交的图片路径
    var imgType = imgUrl.split('.')[imgUrl.split('.').length-1];//获得图片的扩展名
    if(!fileIsImage(imgType)){                                  //判断文件类型是否合法
        res.json('file is not supported img file');
        return;
    }
    //随机生成临时文件的文件名
    var imgName = Date.now().toString()+(Math.floor(Math.random()*10000)).toString()+'.'+imgType;
    //临时文件的存放路径
    var imgPath = './upload/'+imgName;
    //通过nodegrass从网上获取图片，并存入到临时文件目录中
    nodegrass.getFile(imgUrl,imgPath,function (e) {
        if(e) console.log(e);
        var fs = require('fs');
        fs.readFile(imgPath, function (err, data) {
            var fileHash = getMd5Hash(data);                        //计算图片文件的md5摘要
            var despath = './public/images/'+fileHash+'.'+imgType;  //将文件存放入静态文件目录下，以其摘要来命名
            fs.rename(imgPath,despath, function (err) {
                if(err) res.json(err);
                res.json(despath);                                  //将文件存放路径返回
            });
        });

    });
});

//删除表单内容
router.get('/delete', adminVerify,function (req, res, next) {
    ctrl.deleteById(req, res, next);
});

//退出登录
router.get('/logout', adminVerify, function (req, res, next) {
    req.session.destroy();
    res.render('view.admin.login.html');
});

//定义两个扩展方法

//方法来确定文件为合法的图像文件
function fileIsImage(imgType){
    imgType = imgType.toLowerCase();
    if(imgType=='jpg'||imgType =='png'||imgType=='jpeg'||imgType=='gif'||imgType=='bmp'){
        return true;
    }
    return false;

}

//方法来计算图像的md5摘要
function getMd5Hash(fileData){
    if(!fileData){
        return console.log('no data');
    }
    var crypto = require('crypto');
    var fsHash = crypto.createHash('md5');
    fsHash.update(fileData);
    return fsHash.digest('hex');
}

module.exports = router;
