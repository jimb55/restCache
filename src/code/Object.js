/**
 * Created by jimb55 on 17/2/10.
 */

let _Object = (function () {
    //对象原类
    class _Object {
        //构造函数
        constructor() {
        }

        publicMap(_public = {}) {
            Object.assign(this, _public);
        }
    }
    return _Object;
})();

export {_Object}