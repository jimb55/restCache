/**
 * Created by jimb55 on 17/2/10.
 *
 * websql
 *
 */
import {rc_sql as Sql} from "../code/Sql"

let rc_websql = (function () {
    class WebSql extends Sql{
        //构造函数
        constructor() {
            super();
            //创建 restcache 数据库和表
            this.db = openDatabase('restcache2', '1.1', 'restcache', 50 * 1024 * 1024);
            this.db.transaction((transaction) => {
                transaction.executeSql('CREATE TABLE IF NOT EXISTS restcache (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL, json TEXT NOT NULL)');
            });
            this.db.transaction((transaction) => {
                transaction.executeSql('CREATE TABLE restcachechangetime (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, last_time TEXT NOT NULL)',[],() => {
                    transaction.executeSql("INSERT INTO restcachechangetime (last_time) VALUES (?)",[window.CACHE_SAVE_TIME]);
                });
            });
        }

        addItem({url=false,jsonStr=false} = {},callback){
            if(!url&&!jsonStr){
                console.error("url,json is require");
                return;
            }
            this.db.transaction( (tx) => {
                tx.executeSql('INSERT INTO restcache (url,json) VALUES (?, ?)', [url, jsonStr],(e) => {
                    if( typeof(callback) == 'function') callback(e);
                },(e) => {
                    if( typeof(callback) == 'function') callback(e);
                });
            });

        }

        updateItem({url=false,jsonStr=false} = {},callback){
            if(!url&&!json){
                console.error("url,json is require");
                return;
            }

            this.db.transaction( (tx) => {
                tx.executeSql('UPDATE restcache SET json=? WHERE url=?', [jsonStr,url],(e) => {
                    if( typeof(callback) == 'function') callback(e);
                },(e) => {
                    if( typeof(callback) == 'function') callback(e);
                });
            });
        }

        deleteList(query = "",callback){
            this.db.transaction((tx) => {
                tx.executeSql('DELETE FROM restcache WHERE  url like "%'+query+'%"',[],(e) => {
                    if( typeof(callback) == 'function') callback(query);
                },(e) => {
                    dd(e);
                    if( typeof(callback) == 'function') callback(query);
                });
            });
        };

        getItem(query = "",callback){
            this.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM  restcache WHERE url like "%'+query+'%"',[],(tx,results) => {
                    if( typeof(callback) == 'function') callback(results.rows.length>0?results.rows[0]:{});
                });
            });
        };


        getList(query = "",callback){
            this.db.transaction((tx) => {
                tx.executeSql('SELECT * FROM  restcache WHERE url like "%'+query+'%"',[],(tx,results) => {
                    if( typeof(callback) == 'function') callback([...results.rows]);
                });
            });
        };

        updateTime(){
            this.db.transaction( (tx) => {
                tx.executeSql('UPDATE restcachechangetime SET last_time=?', [window.CACHE_SAVE_TIME]);
            });
        }

        getTime(callback){
            this.db.transaction( (tx) => {
                tx.executeSql('SELECT * FROM  restcachechangetime', [],(tx,results) => {
                    if( typeof(callback) == 'function') callback(results.rows.length>0?results.rows[0]:{});
                });
            });
        }

    }
    return WebSql;
})();

export {rc_websql}