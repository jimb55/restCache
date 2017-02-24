<?php

namespace Jimb\RestCache;

use Jimb\RestCache\ConfigManage;
use Illuminate\Database\Capsule\Manager as Capsule;
use Jimb\RestCache\Model\RestCache as RestCacheModel;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

class RestCache
{
    use ConfigManage;

    public function __construct()
    {
    }

    /**
     * 加载Capsule
     */
    public function bootstrapCapsule()
    {
        //新建一个 Capsule 进行配置
        $capsule = new Capsule;

        //数据库连接属性配置
        $capsule->addConnection($this->getMysqlConfig());

        // 注册model 事件组建
        $capsule->setEventDispatcher(new Dispatcher(new Container));

        // Make this Capsule instance available globally via static methods...
        $capsule->setAsGlobal();

        // 安装Eloquent
        $capsule->bootEloquent();
    }

    /**
     * 创建一个restcache table
     */
    public function createTable()
    {
        Capsule::schema()->create('restcache', function (Blueprint $table) {
            $table->increments('id');
            $table->string('router');
            $table->string('table');
            $table->string('action');
            $table->timestamps();
        });
    }

    /**
     * 更改 table 的变化
     *
     * @param $table string || array
     */
    public function saveTableChange($table)
    {
        $tables = is_array($table) ? $table : array($table);
        $rules = $this->getTableRouteRule();

        $routers = $this->getRouterChange($tables, $rules);

        //更新数据数据
        foreach ($routers as $item) {
            $restCacheModel = RestCacheModel::where("router", "=", $item)->first();
            $restCacheModel = $restCacheModel == NULL ? new RestCacheModel : $restCacheModel;
            $restCacheModel->router = $item;
            $restCacheModel->table = "";
            $restCacheModel->action = time();
            $restCacheModel->save();
        }
    }

    /**
     * 根据更新时间取得改变的 路由
     *
     * @param $updateTime
     * @return array
     */
    public function getRouterFromTime($updateTime)
    {
        $arr = RestCacheModel::select("router")->where("updated_at", ">", $updateTime)->get()->toArray();
        return array_column($arr, "router");
    }

    /**
     * 取得需要更新变化的 路由规则
     *
     * @param $tables
     * @param $rules
     * @return array
     */
    public function getRouterChange($tables, $rules)
    {
        $changeRoute = [];
        foreach ($tables as $table) {
            foreach ($rules as $key => $rule) {
                if (in_array($table, $rule)) {
                    array_push($changeRoute, $key);
                }
            }
        }
        return array_unique($changeRoute);
    }

}

