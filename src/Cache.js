/**
 * Created by jimb55 on 17/2/10.
 *
 * cache 存储对象
 *
 */
import {rc_websql as WebSql} from './db/WebSql';
import {_Object as Obj} from './code/Object';
import {rc_helper as Helper} from './code/Helper';

let rc_cache = (function () {
    class Cache extends Obj{
        //构造函数
        constructor(opt) {
            super();
            this.publicMap({
                webSql:new WebSql()
            });
        }

        /**
         * 保存数据
         */
        saveDataWithUrl(url,data){
            var jsonStr = typeof data === 'string' ? data : JSON.stringify(data);

            //检查有没有记录,有添加,没有就更新
            this.webSql.getList(url,(data) => {
                if(data.length === 0 ){
                    this.webSql.addItem({url,jsonStr});
                    this.updateLastTime();
                }else{
                    this.webSql.updateItem({url,jsonStr});
                    this.updateLastTime();
                }
            });

            // this.webSql.getList({url,jsonStr}); Helper.getUrlPathnameRule(url)
        }


        /**
         * 取得数据
         */
        getDataWithUrl(url,callback){
            this.webSql.getItem(url,(data) => {
                callback(eval("(" + data.json + ")"));
            });
        }

        /**
         * 删除数据列表
         */
        deleteDataWithUrl(urls,callback){
            for(let item of urls){
                this.webSql.deleteList(item,(dw) => {
                    urls.splice(urls.indexOf(dw),1);
                    if(urls.length == 0){
                        callback(true);
                    }
                });
            }
        }

        /**
         * 检查路由变化
         */
        checkChangeWithRoute(url,callback){
            this.getLastTime((res) => {
                this.sendGetHttp(Helper.addUrlPara(url,"updated_at",res.last_time),callback);
            });
        }

        /**
         * 判断 url 是否存在
         */
        isExistCache(url,callback){
            this.webSql.getList(url,(data) => {
                if(data.length === 0 ){
                    callback(false)
                }else{
                    callback(true)
                }
            });
        }

        /**
         * 取得x更新时间
         * @param callback function
         */
        getLastTime(callback){
            this.webSql.getTime(callback);
        }

        /**
         * 取得更新时间
         */
        updateLastTime(){
            this.webSql.updateTime();
        }

        /**
         * 发送请求
         */
        sendGetHttp(url,callback){
            //XMLHttpRequest 请求
            var request = new XMLHttpRequest();

            //上传连接地址
            request.open("GET", url);
            request.responseType = "json";

            request.onreadystatechange=function()
            {
                if (request.readyState==4)
                {
                    if(request.status==200){
                        callback(request.response)
                    }else{
                        callback(request.response)
                    }
                }
            }
            request.send();
        }

    }
    return Cache;
})();

export {rc_cache}
