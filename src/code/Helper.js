/**
 * Created by jimb55 on 17/2/12.
 *
 * 工具类
 *
 */
import {rc_urlanalys as URLAnalys} from "./URLAnalysis"

let rc_helper = new (function () {
    return {
        /**
         * 取得url规则
         *
         * @param url
         * @returns {*}
         */
        getUrlPathnameRule(url){
            let urlanalys = new URLAnalys(url);
            return urlanalys.getPathname();
        },


        /**
         * 添加url 参数
         *
         * @param url
         * @param name
         * @param value
         */
        addUrlPara(url, name, value) {
            var currentUrl = url;
            if (/\?/g.test(currentUrl)) {
                if (/name=[-\w]{4,25}/g.test(currentUrl)) {
                    currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
                } else {
                    currentUrl += "&" + name + "=" + value;
                }
            } else {
                currentUrl += "?" + name + "=" + value;
            }
            return currentUrl;
        },

        /**
         * 取得当前时间
         * @returns {string}
         */
        getNowFormatDate()
        {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }

            var Hour = date.getHours();
            var getMinute = date.getMinutes();
            var getSecond = date.getSeconds();
            if (getSecond >= 0 && getSecond <= 9) {
                getSecond = "0" + getSecond;
            }
            if (getMinute >= 0 && getMinute <= 9) {
                getMinute = "0" + getMinute;
            }
            if (Hour >= 0 && Hour <= 9) {
                Hour = "0" + Hour;
            }


            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + Hour + seperator2 + getMinute
                + seperator2 + getSecond;
            return currentdate;
        }
    }
})();

export {rc_helper}