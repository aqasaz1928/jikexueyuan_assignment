<?php
/**
 * Created by PhpStorm.
 * User: Joker
 * Date: 2015/12/17
 * Time: 20:41
 */

define('HOME_PATH','../Static/imgs/');
//判断有post请求时开始执行
if (isset($_POST)) {
    //拿到上传的图片
    $file = $_FILES['upload-img'];
    $file_type = $file['type'];
    $filename = $file['name'];
    //如果存在错误信息，则将错误输出
    if ($file["error"] > 0) {
        echo "Error: " . $file["error"] . "<br />";
        die("error");
    }
    //判断文件是否是支持的图片文件，切大小不能大于15M
    if (($file_type == "image/gif")
            || ($file_type == "image/jpeg")
            || ($file_type== "image/pjpeg")
            || ($file_type == "image/png")
        && ($file["size"] < 150000)) {
        //将文件移动到服务器上存储
        move_uploaded_file($file['tmp_name'],HOME_PATH.$filename);
        //返回文件在服务器上的位置
        echo HOME_PATH.$filename;
    }else{
        echo 'Error<br>';
        echo 'file size too large or wrong file type';
    }
    }


    ?>