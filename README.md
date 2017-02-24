这是什么
========================
使用本地缓存,储存 api 接口返回的json数据,
<br/>每次请求时先检查本地是否留有记录,避免发送重复请求
<br>本地缓存暂时使用 `websql`
<br>

使用场景
========================
在rest api 的架构上,数据结构粒度变小, 如 `cars` 表有它的增删改查,`users`表有它的增删改查
<br> 当某个需要关联其数据的界面上,如`componys`表需要记录`cars`,`users`的`id`,那添加页面需要请求`cars`和`users`取得列表
<br> 那么需要发送 ***GET*** `/cars`,***GET***` /users` 取得列表,这时一个页面需要3个请求,每次添加或编辑时都发送同样的请求
<br> 为什么不吧不经常变动的资源请求放到本地呢,设想`componys`若是关联5个表,那么就意味着每次添加或编辑`componys`时都少发5个请求

安装
========================
###安装example
如果你需要看看完整例子,后端`server`你需要有 `composer` `mysql` 和 `php`
- 需要到 `server/restcache` 目录吓 下运行
```Composer
composer install
```
- 修改配置文件 `server/restcache/example/config.php`
```php
return [
    'routerPrefix'    => "example",
    //路由和表的对应关系
    'routeTableRule'  => [
        'add_car_company' => ['cars','companys'],
        'cars'         => ['cars'],
        'companys'     => ['companys'],
        'adds'     => ['others'],
    ],
    //数据库连接信息
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'port' => '3306',
            'database' => 'cachetest',//数据库
            'username' => 'root',//用户名
            'password' => 'jian',//密码
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]
    ],
];
```
- 显示界面是 ``/example` 下的 `index.html`,下面是创建表和测试例子
<br>![][testtoindex]

###后端可以通过composer 直接安装
```
composer require jimb/restcache
```

使用
==================================
###前端
主要在执行请求前查看是否存在缓存,存在就不请求了,直接在缓存取

```javascript
    //假如是使用jquery,conf是配置
    /**
     * get
     */
    $.ajaxCache = function (conf) {
        //验证是否存在缓存
        cache.isExistCache(conf.url,(isexist) => {
            if(isexist){
                //存在直接返回结果
                cache.getDataWithUrl(conf.url, conf.success);
            }else{
                //不存在发送请求且保存响应结果
                if(typeof conf.success == "function"){
                    var yf = conf.success;
                    conf.success = (result) => {
                        cache.saveDataWithUrl(conf.url, result);
                        yf(result);
                    }
                }else{
                    conf.success = (result) => {
                        cache.saveDataWithUrl(conf.url, result);
                    }
                }
                $.ajax(conf);
            }
        });
    };
```
<br>调用:

```javascript
function send(url,i){
        $.ajaxCache({
            type: "GET",  //提交方式
            url: url,//路径
            headers: {'Authorization-Admin-User': '08193w0lfeLzZ48wTuQViYvBH6z+e01QRwSNs0olhsTKerW@2SMSLnGbmtobpWkt0x7wFgfa1adV458reT0z'},
            dataType:"json",
            success: function (result) {
                $("#showList").append(result[i].name +"&nbsp; &nbsp; &nbsp; "+result[i].email + "<br />");
            },
            error: function (e) {
                console.log(e);
            }
        });
}
```

##后端
首先配置文件
```php
<?php
return [
    //路由和表的对应关系
    //这里面要配置好,就是没个rest资源需要对应影响的表
    //下面的测试的,你应该在你的框架上配置好rest路由
    'routeTableRule'  => [
        'setcarcompanys' => ['cars','companys'],
        'cars'         => ['cars'],
        'companys'     => ['companys'],
        'adds'     => ['others'],
    ],
    //数据库连接信息
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'port' => '3306',
            'database' => 'cachetest',//数据库
            'username' => 'root',//用户名
            'password' => 'jian',//密码
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]
    ],
];

```

```php
<?php
use Jimb\RestCache\RestCache;

//新建缓存类
$restCache = new RestCache;
//载入Capsule
$restCache -> bootstrapCapsule();
//可以设置配置文件路径
$restCache -> setConfig(__DIR__."/config.php");

```
Capsule 是 `laravel` 的 database 组建,之后可能会支持 `laravel`

<br>然后你可一直接在表修改成功时调用
```php
<?php
$restCache -> saveTableChange(["cars","companys"]);
```


----------------------------------------------------------------------------------------
[testtoindex]:http://oisg0jlaw.bkt.clouddn.com/BDF6358C-3116-466C-97B9-6559BB6A232F.png
