<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="libs/bootstrap-3.3.5-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="libs/bootstrap-3.3.5-dist/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="Styles/DashboardCss.css">
    <script src="JavaScript/jquery.min.js"></script>
    <script src="libs/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <script src="JavaScript/JsFunc.js"></script>
    <title>百度新闻管理系统</title>
</head>
<body>
<?php
/**
 * Created by PhpStorm.
 * User: Joker
 * Date: 2015/12/14
 * Time: 14:46
 */
//if($_POST['username']!='root'&&$_POST['password']!='admin'){
//    header("refresh:3;url=http://localhost:63342/BaiduNewsPhone/index.html");
//    die('用户验证失败！');
//}

require_once 'app/db_config.php';
require_once 'app/functions.php';
session_start();
date_default_timezone_set('Asia/Shanghai');

if(!isset($_SESSION['token'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    if(($token=get_root_certification($username,$password))){
        $_SESSION['token'] = $token;
    }else{
        $_SESSION['token'] = null;
        session_destroy();
        header('refresh:3;url=AdminLogin.html');
        die("账户名或密码错误");

    }
}
$db_data_all = json_decode(select_all(),true);
?>

<div class="container-fluid">
    <header class="col-md-12">
        <h3>新闻数据管理系统</h3>
        <nav class="navbar navbar-inverse">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false" onclick="onToggleBtnClick()">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">数据库</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">数据一览<span class="sr-only">(current)</span></a></li>
                        <li><a class="goto-add-news" href="AddNews.html">发布新闻</a></li>

                    </ul>
                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#"></a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false" onclick="">设置
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">用户设置</a></li>
                                <li><a href="#">数据库设置</a></li>
                                <li><a href="index.html">页面预览</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a onclick="quit()">退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
        </nav>
    </header>

    <div class="main-content col-md-12">
        <table class="table table-striped table-hover col-md-12">
            <tr>
                <th>新闻ID</th>
                <th>新闻标题</th>
                <th>新闻类型</th>
                <th>新闻门类</th>
                <th>修改时间</th>
                <th>操作</th>
            </tr>
            <?php
                foreach($db_data_all as $news_data){
                    $news_time =  date('Y-m-d,H:i:s',$news_data['news_time']);

            ?>
            <tr>
                <?php
                    echo "<td>{$news_data["news_id"]}</td>";
                echo "<td>{$news_data["news_title"]}</td>";
                echo "<td>{$news_data["news_type"]}</td>";
                echo "<td>{$news_data["news_subject"]}</td>";
                    echo "<td>{$news_time}</td>";
                    echo "<td><a href='EditNews.php?news_id=".$news_data['news_id']."'>修改 &nbsp</a>";
                    echo "<a href='javascript:doDelete({$news_data['news_id']})'>&nbsp 删除</a></td>";
                ?>
            </tr>
            <?php
                }
            ?>
        </table>
    </div>

</div>
<footer>
    <p>版权声明®</p>
</footer>

</body>
</html>