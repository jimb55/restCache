/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Cache = __webpack_require__(1);

	var _Helper = __webpack_require__(5);

	var dd = console.log;

	//保存打开网页的时间
	window.CACHE_SAVE_TIME = _Helper.rc_helper.getNowFormatDate();
	window.cache = new _Cache.rc_cache();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rc_cache = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _WebSql = __webpack_require__(2);

	var _Object = __webpack_require__(4);

	var _Helper = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jimb55 on 17/2/10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * cache 存储对象
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var rc_cache = function () {
	    var Cache = function (_Obj) {
	        _inherits(Cache, _Obj);

	        //构造函数
	        function Cache(opt) {
	            _classCallCheck(this, Cache);

	            var _this = _possibleConstructorReturn(this, (Cache.__proto__ || Object.getPrototypeOf(Cache)).call(this));

	            _this.publicMap({
	                webSql: new _WebSql.rc_websql()
	            });
	            return _this;
	        }

	        /**
	         * 保存数据
	         */


	        _createClass(Cache, [{
	            key: 'saveDataWithUrl',
	            value: function saveDataWithUrl(url, data) {
	                var _this2 = this;

	                var jsonStr = typeof data === 'string' ? data : JSON.stringify(data);

	                //检查有没有记录,有添加,没有就更新
	                this.webSql.getList(url, function (data) {
	                    if (data.length === 0) {
	                        _this2.webSql.addItem({ url: url, jsonStr: jsonStr });
	                        _this2.updateLastTime();
	                    } else {
	                        _this2.webSql.updateItem({ url: url, jsonStr: jsonStr });
	                        _this2.updateLastTime();
	                    }
	                });

	                // this.webSql.getList({url,jsonStr}); Helper.getUrlPathnameRule(url)
	            }

	            /**
	             * 取得数据
	             */

	        }, {
	            key: 'getDataWithUrl',
	            value: function getDataWithUrl(url, callback) {
	                this.webSql.getItem(url, function (data) {
	                    callback(eval("(" + data.json + ")"));
	                });
	            }

	            /**
	             * 删除数据列表
	             */

	        }, {
	            key: 'deleteDataWithUrl',
	            value: function deleteDataWithUrl(urls, callback) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = urls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var item = _step.value;

	                        this.webSql.deleteList(item, function (dw) {
	                            urls.splice(urls.indexOf(dw), 1);
	                            if (urls.length == 0) {
	                                callback(true);
	                            }
	                        });
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }

	            /**
	             * 检查路由变化
	             */

	        }, {
	            key: 'checkChangeWithRoute',
	            value: function checkChangeWithRoute(url, callback) {
	                var _this3 = this;

	                this.getLastTime(function (res) {
	                    _this3.sendGetHttp(_Helper.rc_helper.addUrlPara(url, "updated_at", res.last_time), callback);
	                });
	            }

	            /**
	             * 判断 url 是否存在
	             */

	        }, {
	            key: 'isExistCache',
	            value: function isExistCache(url, callback) {
	                this.webSql.getList(url, function (data) {
	                    if (data.length === 0) {
	                        callback(false);
	                    } else {
	                        callback(true);
	                    }
	                });
	            }

	            /**
	             * 取得x更新时间
	             * @param callback function
	             */

	        }, {
	            key: 'getLastTime',
	            value: function getLastTime(callback) {
	                this.webSql.getTime(callback);
	            }

	            /**
	             * 取得更新时间
	             */

	        }, {
	            key: 'updateLastTime',
	            value: function updateLastTime() {
	                this.webSql.updateTime();
	            }

	            /**
	             * 发送请求
	             */

	        }, {
	            key: 'sendGetHttp',
	            value: function sendGetHttp(url, callback) {
	                //XMLHttpRequest 请求
	                var request = new XMLHttpRequest();

	                //上传连接地址
	                request.open("GET", url);
	                request.responseType = "json";

	                request.onreadystatechange = function () {
	                    if (request.readyState == 4) {
	                        if (request.status == 200) {
	                            callback(request.response);
	                        } else {
	                            callback(request.response);
	                        }
	                    }
	                };
	                request.send();
	            }
	        }]);

	        return Cache;
	    }(_Object._Object);

	    return Cache;
	}();

	exports.rc_cache = rc_cache;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rc_websql = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Sql2 = __webpack_require__(3);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jimb55 on 17/2/10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * websql
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var rc_websql = function () {
	    var WebSql = function (_Sql) {
	        _inherits(WebSql, _Sql);

	        //构造函数
	        function WebSql() {
	            _classCallCheck(this, WebSql);

	            //创建 restcache 数据库和表
	            var _this = _possibleConstructorReturn(this, (WebSql.__proto__ || Object.getPrototypeOf(WebSql)).call(this));

	            _this.db = openDatabase('restcache2', '1.1', 'restcache', 50 * 1024 * 1024);
	            _this.db.transaction(function (transaction) {
	                transaction.executeSql('CREATE TABLE IF NOT EXISTS restcache (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL, json TEXT NOT NULL)');
	            });
	            _this.db.transaction(function (transaction) {
	                transaction.executeSql('CREATE TABLE restcachechangetime (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, last_time TEXT NOT NULL)', [], function () {
	                    transaction.executeSql("INSERT INTO restcachechangetime (last_time) VALUES (?)", [window.CACHE_SAVE_TIME]);
	                });
	            });
	            return _this;
	        }

	        _createClass(WebSql, [{
	            key: 'addItem',
	            value: function addItem() {
	                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	                    _ref$url = _ref.url,
	                    url = _ref$url === undefined ? false : _ref$url,
	                    _ref$jsonStr = _ref.jsonStr,
	                    jsonStr = _ref$jsonStr === undefined ? false : _ref$jsonStr;

	                var callback = arguments[1];

	                if (!url && !jsonStr) {
	                    console.error("url,json is require");
	                    return;
	                }
	                this.db.transaction(function (tx) {
	                    tx.executeSql('INSERT INTO restcache (url,json) VALUES (?, ?)', [url, jsonStr], function (e) {
	                        if (typeof callback == 'function') callback(e);
	                    }, function (e) {
	                        if (typeof callback == 'function') callback(e);
	                    });
	                });
	            }
	        }, {
	            key: 'updateItem',
	            value: function updateItem() {
	                var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	                    _ref2$url = _ref2.url,
	                    url = _ref2$url === undefined ? false : _ref2$url,
	                    _ref2$jsonStr = _ref2.jsonStr,
	                    jsonStr = _ref2$jsonStr === undefined ? false : _ref2$jsonStr;

	                var callback = arguments[1];

	                if (!url && !json) {
	                    console.error("url,json is require");
	                    return;
	                }

	                this.db.transaction(function (tx) {
	                    tx.executeSql('UPDATE restcache SET json=? WHERE url=?', [jsonStr, url], function (e) {
	                        if (typeof callback == 'function') callback(e);
	                    }, function (e) {
	                        if (typeof callback == 'function') callback(e);
	                    });
	                });
	            }
	        }, {
	            key: 'deleteList',
	            value: function deleteList() {
	                var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	                var callback = arguments[1];

	                this.db.transaction(function (tx) {
	                    tx.executeSql('DELETE FROM restcache WHERE  url like "%' + query + '%"', [], function (e) {
	                        if (typeof callback == 'function') callback(query);
	                    }, function (e) {
	                        dd(e);
	                        if (typeof callback == 'function') callback(query);
	                    });
	                });
	            }
	        }, {
	            key: 'getItem',
	            value: function getItem() {
	                var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	                var callback = arguments[1];

	                this.db.transaction(function (tx) {
	                    tx.executeSql('SELECT * FROM  restcache WHERE url like "%' + query + '%"', [], function (tx, results) {
	                        if (typeof callback == 'function') callback(results.rows.length > 0 ? results.rows[0] : {});
	                    });
	                });
	            }
	        }, {
	            key: 'getList',
	            value: function getList() {
	                var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	                var callback = arguments[1];

	                this.db.transaction(function (tx) {
	                    tx.executeSql('SELECT * FROM  restcache WHERE url like "%' + query + '%"', [], function (tx, results) {
	                        if (typeof callback == 'function') callback([].concat(_toConsumableArray(results.rows)));
	                    });
	                });
	            }
	        }, {
	            key: 'updateTime',
	            value: function updateTime() {
	                this.db.transaction(function (tx) {
	                    tx.executeSql('UPDATE restcachechangetime SET last_time=?', [window.CACHE_SAVE_TIME]);
	                });
	            }
	        }, {
	            key: 'getTime',
	            value: function getTime(callback) {
	                this.db.transaction(function (tx) {
	                    tx.executeSql('SELECT * FROM  restcachechangetime', [], function (tx, results) {
	                        if (typeof callback == 'function') callback(results.rows.length > 0 ? results.rows[0] : {});
	                    });
	                });
	            }
	        }]);

	        return WebSql;
	    }(_Sql2.rc_sql);

	    return WebSql;
	}();

	exports.rc_websql = rc_websql;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by jimb55 on 17/2/10.
	 *
	 * Sql 基本操作
	 *
	 */
	var rc_sql = function () {
	  var Sql = function () {
	    //构造函数
	    function Sql(opt) {
	      _classCallCheck(this, Sql);
	    }

	    /**
	     * 添加一项
	     */


	    _createClass(Sql, [{
	      key: "addItem",
	      value: function addItem() {}
	    }, {
	      key: "deleteList",


	      /**
	       * 根据规则删除列表
	       */
	      value: function deleteList() {}
	    }, {
	      key: "getItem",


	      /**
	       * 根据规则取得项
	       */
	      value: function getItem() {}
	    }, {
	      key: "getList",


	      /**
	       * 根据规则取得列表
	       */
	      value: function getList() {}
	    }, {
	      key: "updateItem",


	      /**
	       * 根据规则修改项
	       */
	      value: function updateItem() {}

	      /**
	       * 修改最近更新时间
	       */

	    }, {
	      key: "updateTime",
	      value: function updateTime() {}

	      /**
	       * 取得修改时间
	       */

	    }, {
	      key: "getTime",
	      value: function getTime() {}
	    }]);

	    return Sql;
	  }();

	  return Sql;
	}();

	exports.rc_sql = rc_sql;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by jimb55 on 17/2/10.
	 */

	var _Object = function () {
	    //对象原类
	    var _Object = function () {
	        //构造函数
	        function _Object() {
	            _classCallCheck(this, _Object);
	        }

	        _createClass(_Object, [{
	            key: "publicMap",
	            value: function publicMap() {
	                var _public = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	                Object.assign(this, _public);
	            }
	        }]);

	        return _Object;
	    }();

	    return _Object;
	}();

	exports._Object = _Object;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rc_helper = undefined;

	var _URLAnalysis = __webpack_require__(6);

	var rc_helper = new function () {
	    return {
	        /**
	         * 取得url规则
	         *
	         * @param url
	         * @returns {*}
	         */
	        getUrlPathnameRule: function getUrlPathnameRule(url) {
	            var urlanalys = new _URLAnalysis.rc_urlanalys(url);
	            return urlanalys.getPathname();
	        },


	        /**
	         * 添加url 参数
	         *
	         * @param url
	         * @param name
	         * @param value
	         */
	        addUrlPara: function addUrlPara(url, name, value) {
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
	        getNowFormatDate: function getNowFormatDate() {
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

	            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + Hour + seperator2 + getMinute + seperator2 + getSecond;
	            return currentdate;
	        }
	    };
	}(); /**
	      * Created by jimb55 on 17/2/12.
	      *
	      * 工具类
	      *
	      */
	exports.rc_helper = rc_helper;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by jimb55 on 17/2/13.
	 */

	var rc_urlanalys = function () {
	    var URLAnalysis = function () {
	        //构造函数
	        function URLAnalysis(url) {
	            _classCallCheck(this, URLAnalysis);

	            this._fields = {
	                'Username': 4,
	                'Password': 5,
	                'Port': 7,
	                'Protocol': 2,
	                'Host': 6,
	                'Pathname': 8,
	                'URL': 0,
	                'Querystring': 9,
	                'Fragment': 10
	            };

	            this._values = {};
	            this._regex = null;
	            this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
	            for (var f in this._fields) {
	                this['get' + f] = this._makeGetter(f);
	            }

	            if (typeof url != 'undefined') {
	                this._parse(url);
	            }
	        }

	        _createClass(URLAnalysis, [{
	            key: 'setURL',
	            value: function setURL(url) {
	                this._parse(url);
	            }
	        }, {
	            key: '_initValues',
	            value: function _initValues() {
	                for (var f in this._fields) {
	                    this._values[f] = '';
	                }
	            }
	        }, {
	            key: '_parse',
	            value: function _parse(url) {
	                this._initValues();
	                var r = this._regex.exec(url);
	                if (!r) throw "DPURLParser::_parse -> Invalid URL";

	                for (var f in this._fields) {
	                    if (typeof r[this._fields[f]] != 'undefined') {
	                        this._values[f] = r[this._fields[f]];
	                    }
	                }
	            }
	        }, {
	            key: '_makeGetter',
	            value: function _makeGetter(field) {
	                return function () {
	                    return this._values[field];
	                };
	            }
	        }]);

	        return URLAnalysis;
	    }();

	    return URLAnalysis;
	}();

	exports.rc_urlanalys = rc_urlanalys;

/***/ }
/******/ ]);