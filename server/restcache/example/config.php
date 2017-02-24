<?php
//配置文件 ,主要配置路由和table 对应关系
return [
    'routerPrefix'    => "example",
    'routeTableRule'  => [
        'add_car_company' => ['cars','companys'],
        'cars'         => ['cars'],
        'companys'     => ['companys'],
        'adds'     => ['others'],
    ],
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'port' => '3306',
            'database' => 'cachetest',
            'username' => 'root',
            'password' => 'jian',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]
    ],
];