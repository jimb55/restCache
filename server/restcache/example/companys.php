<?php
/**
 * Created by PhpStorm.
 *
 * 取得公司列表
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

echo Capsule::table("companys") -> orderBy("id","desc") -> limit(10) -> get() -> toJSON();

