<?php
/**
 * Created by PhpStorm.
 * User: Joker
 * Date: 2015/12/13
 * Time: 18:43
 */
require_once 'db_config.php';
require_once 'functions.php';
session_start();


if (isset($_GET)) {
    switch ($_GET['action']) {
        case 'getAll':
            echo select_all();
            break;
        case 'getNews':
            echo select_news($_GET['subject']);
            break;

        case 'count':
            echo select_count($_GET['subject']);
            break;
        case 'getRows':
            $start = $_GET['start'];
            $rows = $_GET['rows'];
            echo select_rows($start,$rows,$_GET['subject']);
            break;
        case 'del':
            if (!isset($_SESSION['token'])) {
                die("非法操作");
            } else {
                delete_by_id($_GET['id']);
                echo "<script>alert('删除成功');window.location = \"../DashBoard.php\";</script>";
            }
            break;
        case 'add':
            if (!isset($_SESSION['token'])) {
                die("非法操作");
            } else {
                add_news();
            }

            break;
        case 'edit':
            if (!isset($_SESSION['token'])) {
                die("非法操作");
            } else {
                update_news($_POST['news-id']);
            }
            break;
        case 'quit':
            if (!isset($_SESSION['token'])) {
                die("非法操作");
            } else {
                $_SESSION['token'] = null;
                session_destroy();
                echo "<script>window.location='../AdminLogin.html';</script>";
            }
            break;
        default:
            break;

    }

}