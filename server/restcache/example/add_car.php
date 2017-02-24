<?php
/**
 *
 * 添加 车和公司
 *
 * Created by PhpStorm.
 * User: jimb55
 * Date: 17/2/19
 * Time: 上午11:00
 */

use Illuminate\Database\Capsule\Manager as Capsule;
use Jimb\RestCache\RestCache;

/**
 * 随机生成名
 * @param int $length
 * @return string
 */
function generateName($length = 8)
{
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $name = '';
    for ($i = 0; $i < $length; $i++) {
        $name .= $chars[mt_rand(0, strlen($chars) - 1)];
    }
    return $name;
}
$restCache = new RestCache();
$restCache -> bootstrapCapsule();
$restCache -> setConfig(__DIR__."/config.php");

if(Capsule::table('cars')->insert(["name" => generateName(),"email" => generateName()."@".generateName(4).".gmail"])){
    $restCache -> saveTableChange(["cars"]);
    echo("添加成功!");
    header("Location: index.php");
}
