<?php
/**
 * Created by PhpStorm.
 *
 * 创建数据库表
 *
 * User: jimb55
 * Date: 17/2/19
 * Time: 上午11:00
 */
use Illuminate\Database\Capsule\Manager as Capsule;

if(array_key_exists("test",$_GET)){
    if(count(Capsule::select('SHOW TABLES LIKE "companys"')) != 1){
        Capsule::schema() -> create('companys', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }
    if(count(Capsule::select('SHOW TABLES LIKE "cars"')) != 1){
        Capsule::schema() -> create('cars', function ($table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }
}

if(count(Capsule::select('SHOW TABLES LIKE "restcache"')) != 1){
    Capsule::schema()->create('restcache', function ($table) {
        $table->increments('id');
        $table->string('router');
        $table->string('table');
        $table->string('action');
        $table->timestamps();
    });
}
else
    echo ("表已经存在");

header("Location: index.php");