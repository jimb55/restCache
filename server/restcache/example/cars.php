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
use Jimb\RestCache\RestCache;

$restCache = new RestCache;

$restCache -> bootstrapCapsule();

echo Capsule::table("cars") -> orderBy("id","desc") -> limit(10) -> get() -> toJSON();


