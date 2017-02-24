/**
 * Created by jimb55 on 17/2/10.
 *
 * Sql 基本操作
 *
 */
let rc_sql = (function () {
    class Sql {
        //构造函数
        constructor(opt) {

        }

        /**
         * 添加一项
         */
        addItem(){};

        /**
         * 根据规则删除列表
         */
        deleteList(){};

        /**
         * 根据规则取得项
         */
        getItem(){};

        /**
         * 根据规则取得列表
         */
        getList(){};

        /**
         * 根据规则修改项
         */
        updateItem(){}

        /**
         * 修改最近更新时间
         */
        updateTime(){}

        /**
         * 取得修改时间
         */
        getTime(){}

    }
    return Sql;
})();

export {rc_sql}
