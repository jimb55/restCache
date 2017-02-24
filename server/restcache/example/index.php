<?php
/**
 * Created by PhpStorm.
 * User: jimb55
 * Date: 17/2/19
 * Time: 上午11:00
 */

require "../vendor/autoload.php";

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Jimb\RestCache\RestCache;
use Illuminate\Container\Container;

//新建一个 Capsule 进行配置
$capsule = new Capsule;

$restCache = new RestCache;

//数据库连接属性配置
$capsule->addConnection($restCache -> getMysqlConfig());

// 注册model 事件组建
$capsule->setEventDispatcher(new Dispatcher(new Container));

// Make this Capsule instance available globally via static methods...
$capsule->setAsGlobal();

// 安装Eloquent
$capsule->bootEloquent();

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


