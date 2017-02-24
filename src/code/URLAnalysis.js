/**
 * Created by jimb55 on 17/2/13.
 */

let rc_urlanalys = (function () {
    class URLAnalysis{
        //构造函数
        constructor(url) {
            this._fields = {
                'Username' : 4,
                'Password' : 5,
                'Port' : 7,
                'Protocol' : 2,
                'Host' : 6,
                'Pathname' : 8,
                'URL' : 0,
                'Querystring' : 9,
                'Fragment' : 10
            };

            this._values = {};
            this._regex = null;
            this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
            for(var f in this._fields)
            {
                this['get' + f] = this._makeGetter(f);
            }

            if (typeof url != 'undefined')
            {
                this._parse(url);
            }
        }

        setURL(url) {
            this._parse(url);
        }

        _initValues() {
            for(var f in this._fields)
            {
                this._values[f] = '';
            }
        }

        _parse(url) {
            this._initValues();
            var r = this._regex.exec(url);
            if (!r) throw "DPURLParser::_parse -> Invalid URL";

            for(var f in this._fields) if (typeof r[this._fields[f]] != 'undefined')
            {
                this._values[f] = r[this._fields[f]];
            }
        }

        _makeGetter(field) {
            return function() {
                return this._values[field];
            }
        }


    }
    return URLAnalysis;
})();

export {rc_urlanalys}
