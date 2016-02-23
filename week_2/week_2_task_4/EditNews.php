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
    <title>修改新闻数据</title>
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
if (!isset($_SESSION['token'])) {
    die("非法操作");
}

$types = array('a', 'b', 'c');
$subjects = array('社会', '娱乐', '本地', '科技');
if (isset($_GET['news_id']) && $_GET['news_id'] != '') {
    $news_id = $_GET['news_id'];
    $target_news = select_by_id($news_id)[0];
    if (($target_news['news_type'] == 'a') || ($target_news['news_type'] == 'c')) {
        $news_imgs = explode(';', $target_news['news_imgs']);
    }
} else {
    die("没有得到正确的数据！");
}
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
                <a class="navbar-brand" href="DashBoard.php">数据库</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="DashBoard.php">数据一览<span class="sr-only">(current)</span></a></li>
                    <li><a class="goto-add-news" href="AddNews.php">发布新闻</a></li>
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
            </div>
            <!-- /.navbar-collapse -->
        </nav>
    </header>

    <div class="main-content col-md-12">
        <div class="content-header col-md-12">
            <div class="space col-md-2"></div>
            <h3 class="col-md-4 news-edit-title">修改新闻</h3>

            <div class="control-panel col-md-4">
                <a href="DashBoard.php" class="btn btn-success">返回</a>
                <?php
                echo "<a onclick=\"doDelete({$news_id})\" class=\"btn btn-danger\">删除</a>";
                ?>
            </div>
        </div>
        <div class="content-body col-md-12">
            <div class="space col-md-2"></div>
            <form action="./app/db_manipulate.php?action=edit" method="post" class="col-md-8 edit-form">
                <div class="form-group col-md-12">
                    <label for="news-id" class="col-md-2 col-xs-12">新闻ID：</label>
                    <?php
                    echo "<input type='text' name='news-id' class='col-md-4 col-xs-12' readonly value='{$news_id}'>";

                    ?>
                </div>
                <div class="form-group col-md-12">
                    <label for="news-title" class="col-md-2 col-xs-12">新闻标题：</label>
                    <?php
                    echo "<input required type='text' name='news-title' class='col-md-8 col-xs-12' value='{$target_news['news_title']}'>";

                    ?>
                </div>
                <div class="form-group col-md-12">
                    <label for="news-type" class="col-md-2 col-xs-12">新闻类型：</label>
                    <?php
                    echo "<input type='text' id='news-type'  readonly name='news-type' class='col-md-3 col-xs-6' value=\"type-{$target_news['news_type']}\">";

                    ?>

                    <label for="news-subject" class="col-md-2 col-xs-12">新闻门类：</label>
                    <?php
                    echo "<select  name='news-subject' class='col-md-3 col-xs-6' required>";
                    foreach ($subjects as $subject) {
                        if ($subject == $target_news['news_subject']) {
                            echo "<option value=\"{$subject}\" selected >{$subject}</option>";
                        } else {
                            echo "<option value=\"{$subject}\">{$subject}</option>";

                        }
                    }
                    echo "</select>";
                    ?>
                </div>
                <div class="form-group col-md-12 col-xs-12">
                    <?php
                    if (($target_news['news_type'] == 'a') || ($target_news['news_type'] == 'b')) {
                        echo "<label for=\"news-abstract\" class=\"col-md-2 col-xs-12\">新闻摘要：</label>";
                        echo "<textarea name=\"news-abstract\" class='col-lg-8 col-xs-12' id=\"news-abstract\" rows=\"5\">";
                        echo "{$target_news['news_abstract']}</textarea>";
                    } else {

                    }

                    ?>
                </div>
                <div class="form-group col-md-12 col-xs-12">
                    <?php
                    if (($target_news['news_type'] == 'a')) {
                        echo "<label for=\"news-imgs-1\" class=\"col-md-2 col-xs-12\">新闻图片：</label>";
                        echo "<input type='text' name=\"news-imgs-1\" class='col-lg-5 col-xs-12' id=\"news-imgs-1\" value='{$news_imgs[0]}' >";
                        echo "<input type=\"file\" name=\"upload-img\" id=\"upload-img-1\" class=\" col-md-12 col-xs-12\">";
                        echo "<input type='button' id='get-img1-preview' class='btn btn-default col-md-2 col-xs-3' value='预览'>";
                        echo "<img class='col-lg-4 col-xs-10' id='img-1-preview' src=\"{$news_imgs[0]}\">";
                    } else if ($target_news['news_type'] == 'c') {
                        echo "<label for=\"news-imgs-1\" class=\"col-md-2 col-xs-12\">新闻图片：</label>";
                        echo "<input type='text' name=\"news-imgs-1\" class='col-lg-5 col-xs-12' id=\"news-imgs-1\" value='{$news_imgs[0]}' >";
                        echo "<input type=\"file\" name=\"upload-img\" id=\"upload-img-1\" class=\" col-md-12 col-xs-12\">";
                        echo "<input type='button' id='get-img1-preview' class='btn btn-default col-md-2 col-xs-3' onclick='getImg1Preview()' value='预览'>";
                        echo "<img class='col-lg-4 col-xs-10' id='img-1-preview' src=\"{$news_imgs[0]}\">";
                        echo "</div>";
                        echo " <div class=\"form-group col-md-12 col-xs-12\">";
                        echo "<label for=\"news-imgs-2\" class=\"col-md-2 col-xs-12\">新闻图片：</label>";
                        echo "<input type='text' name=\"news-imgs-2\" class='col-lg-5 col-xs-12' id=\"news-imgs-2\" value='{$news_imgs[1]}' >";
                        echo "<input type=\"file\" name=\"upload-img\" id=\"upload-img-1\" class=\" col-md-12 col-xs-12\">";
                        echo "<input type='button' id='get-img2-preview' class='btn btn-default col-md-2 col-xs-3' onclick='getImg2Preview()' value='预览'>";
                        echo "<img class='col-lg-4 col-xs-10' id='img-2-preview' src=\"{$news_imgs[1]}\">";
                        echo "</div>";
                        echo " <div class=\"form-group col-md-12 col-xs-12\">";
                        echo "<label for=\"news-imgs-3\" class=\"col-md-2 col-xs-12\">新闻图片：</label>";
                        echo "<input type='text' name=\"news-imgs-3\" class='col-lg-5 col-xs-12' id=\"news-imgs-3\" value='{$news_imgs[2]}' >";
                        echo "<input type=\"file\" name=\"upload-img\" id=\"upload-img-1\" class=\" col-md-12 col-xs-12\">";
                        echo "<input type='button' id='get-img3-preview' class='btn btn-default col-md-2 col-xs-3' value='预览' onclick='getImg3Preview()'>";
                        echo "<img class='col-lg-4 col-xs-10' id='img-3-preview' src=\"{$news_imgs[2]}\">";

                    }
                    ?>
                </div>

                <div class="btn-group col-md-12 col-xs-12 submit-btn-box">
                    <div class="space col-md-10 col-xs-8"></div>
                    <input type="submit" value="提交" class="col-md-2 col-xs-4 btn btn-success">
                </div>

            </form>
        </div>
    </div>
</div>
<footer>
    <p>版权声明®</p>
</footer>

<script>
    $(function () {

        $("input[id^='get-img']").click(function (e) {
            var imgSrc = $(e.target).prev().val();
            if (imgSrc == '') {
                alert('图片地址不能为空');
            } else {
                console.log($(e.target).next().attr('src', imgSrc));

            }

        });
        $("input[type='file']").change(function (e) {
            uploadImgByAjax(e);
        });

        $("input[type='submit']").click(function (e) {
            if(!submitDataVerify()){
                //如果表单数据不完整则弹出警告框，然后组织默认事件
                alert("数据不完整，请您确认表单完整性！");
                e.preventDefault();
                return 0;
            }
            if (!confirm("是否确认提交")) {
                e.preventDefault();
            } else {
                $('form').submit();
            }
        });


    });
</script>
</body>
</html>
