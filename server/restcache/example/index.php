<?php
/**
 * Created by PhpStorm.
 * User: jimb55
 * Date: 17/2/19
 * Time: 上午11:00
 */

require "../vendor/autoload.php";

if(array_key_exists("action",$_GET)){
    include_once './'.$_GET['action'].'.php';
    exit();
}
?>

<a href="<?php echo $_SERVER['PHP_SELF'].'?action=create_table';?>">创建数据库表</a>
<br />
<a href="<?php echo $_SERVER['PHP_SELF'].'?action=create_table&test=1';?>">创建数据库表 + 测试表 ( 后面测试必备 ) </a>
<br />
<a href="<?php echo $_SERVER['PHP_SELF'].'?action=add_car_company';?>">插入一条car 和 company 数据 </a>
<br />
<a href="<?php echo $_SERVER['PHP_SELF'].'?action=add_car';?>">插入一条car 数据 </a>
<br />
<a href="../../../example/">进入测试页面 </a>


