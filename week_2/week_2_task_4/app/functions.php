<?php
/**
 * Created by PhpStorm.
 * User: Joker
 * Date: 2015/12/13
 * Time: 16:05
 */
require_once 'db_config.php';   //引入数据库PDO设置文件
//使用方法连接数据库，并执行一些前置操作
function connect_to_db()
{
    try {
        $mysql_conn = new PDO(PDO_DSN, DB_ADMIN, DB_PW);                      //通过文件设置pdo
        $mysql_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//设定pdo的debug模式
        $mysql_conn->query('set names utf8');                               //将查询结果设置成utf8编码，
        //最后返回数据库操作对象                                                                    //没有这一步中文结果将出现乱码
        return $mysql_conn;
    } catch (PDOException $e) {
        //出现错误是打印错误语句
        echo "数据库连接失败！<br>";
        echo "错误：$e->getMessage()<br>";
        //返回
        return false;
    }


}

//定义函数，查找数据库操作权限
function get_root_certification($username, $password)
{
    //将salt作为盐添加到账户密码之中，使用md5计算token
    $token = md5($username . 'salt' . $password);
    $conn = connect_to_db();
    if ($conn) {
        $sql = "SELECT admin_token FROM `admin` WHERE admin_name='$username'";
        $result = $conn->query($sql);
        $result = $result->fetch(PDO::FETCH_ASSOC);
        if ($result['admin_token'] == '') {
            echo '用户名错误';
            return false;
        }
        if ($token == $result['admin_token']) {
            echo "<script>alert('登陆成功!');</script>";
            return $token;
        } else {
            echo '密码错误';
            return false;
        }
    } else {
        echo '数据库连接出错';
        return false;
    }
}


//一个函数，尝试拿到数据库所有数据
function select_all()
{
    $conn = connect_to_db();
    if ($conn) {
        $result = $conn->query("SELECT * FROM news ORDER BY news_time DESC");
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    } else {
        return '数据库查询出错';
    }
}

function select_count($news_subject="all"){
    $conn = connect_to_db();
    if ($conn) {
        if($news_subject=="all"){
            $result = $conn->query("SELECT count(*) FROM news ");
        }else{
            $result = $conn->query("SELECT count(*) FROM news WHERE news_subject='".$news_subject."'");
        }
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    } else {
        return '数据库查询出错';
    }
}
function select_rows($start,$rows,$subject){
    $conn = connect_to_db();
    if ($conn) {
        if($subject=='all'){
            $result = $conn->query("SELECT * FROM news ORDER BY news_time DESC LIMIT $start,$rows ");
        }else{
            $result = $conn->query("SELECT * FROM news WHERE news_subject='$subject' ORDER BY news_time DESC LIMIT $start,$rows ");
        }
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    } else {
        return '数据库查询出错';
    }
}

function select_news($subject){
    if($subject=='all'){
        return select_all();
    }else{
        $conn = connect_to_db();
        if ($conn) {
            $result = $conn->query("SELECT * FROM news WHERE news_subject='".$subject."' ORDER BY news_time DESC");
            $result = $result->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($result);
        } else {
            return '数据库查询出错';
        }
    }

}

function delete_by_id($id)
{
    $conn = connect_to_db();
    if ($conn) {
        $sql = "DELETE FROM news WHERE news_id = $id";
        $conn->exec($sql);
    } else {
        return '数据库操作出错';
    }
}

function select_by_id($id)
{
    $conn = connect_to_db();
    if ($conn) {
        $sql = "SELECT * FROM news WHERE news_id='$id'";
        $result = $conn->query($sql);
        return $result->fetchAll();
    } else {
        return '数据库操作出错';
    }
}

function update_news($id)
{
    $conn = connect_to_db();
    $news_data = array();
    $news_data['news_title'] = $_POST['news-title'];        //新闻标题
    $news_data['news_subject'] = $_POST['news-subject'];    //新闻门类
    $news_data['news_time'] = time();                    //新闻提交时间
    switch ($_POST['news-type']) {                            //根据新闻类型不同来组装数据
        case 'type-a':
            $news_data['news_abstract'] = $_POST['news-abstract'];
            $news_data['news_imgs'] = $_POST['news-imgs-1'] . ';';
            break;
        case 'type-b':
            $news_data['news_abstract'] = $_POST['news-abstract'];
            $news_data['news_imgs'] = '';
            break;
        case 'type-c':
            $news_data['news_abstract'] = '';
            $news_data['news_imgs'] = $_POST['news-imgs-1'] . ';' . $_POST['news-imgs-2'] . ';' . $_POST['news-imgs-3'];
            break;
        default:
            echo "数据发生错误";
            break;

    }
    if ($conn) {                //当数据库连接对象被成功获取到时，开始向数据库执行添加操作
        $sql = "UPDATE news SET news_title = '" . $news_data['news_title']
            . "', news_subject = '" . $news_data['news_subject'] . "', news_time = '" . $news_data['news_time']
            . "', news_abstract = '" . $news_data['news_abstract'] . "', news_imgs = '" . $news_data['news_imgs'] . "' WHERE news_id=" . $id;

        $conn->exec($sql);
        echo "<script>if(confirm(\"数据修改成功\")){window.location = '../DashBoard.php';}else{window.location = '../DashBoard.php';}</script>";
    } else {
        return '数据库操作出错';
    }
}


//定义方法添加新闻数据
function add_news()
{
    //获取数据库连接对象
    $conn = connect_to_db();
    //建立一个数组，存放请求发送过来的数据
    $news_data = array();
    $news_data['news_title'] = $_POST['news-title'];    //新闻标题
    $news_data['news_type'] = substr($_POST['news-type'],-1);        //新闻类型
    $news_data['news_subject'] = $_POST['news-subject'];//新闻门类
    $news_data['news_time'] = time();                    //新闻提交时间
    switch ($news_data['news_type']) {                    //根据新闻类型不同来组装数据
        case 'a':
            $news_data['news_abstract'] = $_POST['news-abstract'];
            $news_data['news_imgs'] = $_POST['news-imgs-1'] . ';';
            break;
        case 'b':
            $news_data['news_abstract'] = $_POST['news-abstract'];
            $news_data['news_imgs'] = '';
            break;
        case 'c':
            $news_data['news_abstract'] = '';
            $news_data['news_imgs'] = $_POST['news-imgs-1'] . ';' . $_POST['news-imgs-2'] . ';' . $_POST['news-imgs-3'];
            break;
        default:
            break;

    }
    if ($conn) {                //当数据库连接对象被成功获取到时，开始向数据库执行添加操作
        $sql = "INSERT INTO news(news_id, news_title, news_type, news_subject, news_time, news_abstract, news_imgs) VALUES (NULL,?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(1, $news_data['news_title']);
        $stmt->bindParam(2, $news_data['news_type']);
        $stmt->bindParam(3, $news_data['news_subject']);
        $stmt->bindParam(4, $news_data['news_time']);
        $stmt->bindParam(5, $news_data['news_abstract']);
        $stmt->bindParam(6, $news_data['news_imgs']);
        $stmt->execute();
    } else {
        return '数据库操作出错';
    }
    //天价完成后弹出对话框
    echo '<script>';
    echo "if(confirm('添加完成！,确认，继续添加，取消，返回首页。')){window.location = '../AddNews.html';}";
    echo "else{";
    echo "window.location = '../DashBoard.php'}";
    echo '</script>';

}

