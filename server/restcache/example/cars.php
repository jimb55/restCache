<?php
/**
 * Created by PhpStorm.
 *
 * 取得汽车列表
 *
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

echo $capsule -> table("cars") -> orderBy("id","desc") -> limit(10) -> get() -> toJSON();


