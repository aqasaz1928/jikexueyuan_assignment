<?php
/**
 * Created by PhpStorm.
 * User: Joker
 * Date: 2015/12/16
 * Time: 18:05
 */

require_once 'app/db_config.php';
require_once 'app/functions.php';

$data_rows = select_rows(0,10);
//print_r($data_rows);
echo select_count('娱乐');

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="JavaScript/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
<div id="uploadForm">
    <input id="file" type="file"/>
    <button id="upload" type="button">upload</button>
</div>
<script>
    $(function () {



    });
</script>
</body>
</html>
