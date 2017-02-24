<?php

namespace Jimb\RestCache;

trait ConfigManage
{
    //配置路径或 数组
    private $config = './config.php';

    /**
     * 取的配置文件
     *
     * @param $config 字符串为 添加配置文件路径 || 数组为即时配置
     */
    public function setConfig($configInfo){
        $this -> config = $configInfo;
    }

    /**
     * 取的配置文件
     */
    public function getConfig(){
        //全局配置
        $commonConfig = require("../config/RestCache.php");
        if(is_string($this -> config)){
            return array_merge($commonConfig,require($this -> config));
        }else{
            return array_merge($commonConfig,$this -> config);
        }
    }

    /**
     * 取的配置文件
     */
    public function getMysqlConfig(){
        if(array_key_exists("connections",$this -> getConfig())){
            $connections = $this -> getConfig()["connections"];
            if(array_key_exists("mysql",$connections)){
                return $connections["mysql"];
            }
            return [];
        }
        return [];
    }

    /**
     * 取得路由 和表 对应规则
     * @return array
     */
    public function getTableRouteRule(){
        $config = $this -> getConfig();
        return array_key_exists("routeTableRule",$config)? $config["routeTableRule"] : [];
    }

    /**
     * 根据 路由返回 对应表
     *
     * @param $route
     * @return array
     */
    public function getTableFormRoute($route){
        $routes = is_array($route) ? $route : array($route);
        return array_intersect_key($this -> getTableRouteRule(),array_flip($routes));
    }

    /**
     * 返回时区
     *
     * @return mixed
     */
    public function getTimezone(){
        return $this -> getConfig()["timezone"];
    }
}
