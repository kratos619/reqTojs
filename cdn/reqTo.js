"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Request = /*#__PURE__*/ function () {
  function Request() {
    _classCallCheck(this, Request);

    this.xhr = new XMLHttpRequest();
    this.response = {};
    this.response.config = {};
  }

  _createClass(Request, [{
    key: "setHeaders",
    value: function setHeaders(headers, reject) {
      if (_typeof(headers) == 'object' || headers == '') {
        for (var key in headers) {
          this.xhr.setRequestHeader(key, headers[key]);
        }
      }

      if (Array.isArray(headers) == true) {
        reject(new Error('headers must be object, key and value pair'));
      }
    }
  }, {
    key: "validationPostRequest",
    value: function validationPostRequest(url, reject) {
      if (!url) {
        reject(new Error("Required URL"));
      }
    }
  }, {
    key: "headersMap",
    value: function headersMap() {
      var headers = this.xhr.getAllResponseHeaders();
      var arr = headers.trim().split(/[\r\n]+/);
      var headerMap = {};
      arr.forEach(function (line) {
        var parts = line.split(': ');
        var header = parts.shift();
        var value = parts.join(': ');
        headerMap[header] = value;
      });
      return headerMap;
    }
  }, {
    key: "responseObj",
    value: function responseObj() {
      var methodType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      this.response.data = JSON.parse(this.xhr.response);
      this.response.status = this.xhr.status;
      this.response.statusText = this.xhr.statusText;
      this.response.headers = this.headersMap();
      this.response.config.url = this.xhr.responseURL;
      this.response.config.method = methodType;
      this.response.config.headers = this.headersMap();
      this.response.request = this.xhr;
      return this.response;
    }
  }, {
    key: "get",
    value: function get(url) {
      var _this = this;

      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return new Promise(function (resolve, reject) {
        _this.validationPostRequest(url, reject);

        _this.xhr.open("GET", url, true);

        _this.setHeaders(headers, reject);

        _this.xhr.onload = function () {
          if (_this.xhr.status == 400 && _this.xhr.readyState == 4) {
            reject(new Error("url Found"));
          }

          if (_this.xhr.status == 200 && _this.xhr.readyState == 4) {
            resolve(_this.responseObj("GET"));
          }
        };

        _this.xhr.send();
      });
    }
  }, {
    key: "post",
    value: function post(url, sentData, headers) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.validationPostRequest(url, reject);

        _this2.xhr.open('POST', url, true);

        _this2.setHeaders(headers, reject);

        _this2.xhr.onload = function () {
          resolve(_this2.responseObj("POST"));
        };

        _this2.xhr.send(JSON.stringify(sentData));
      });
    }
  }, {
    key: "put",
    value: function put(url, sentData, headers) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.validationPostRequest(url, reject);

        _this3.xhr.open("PUT", url, true);

        _this3.setHeaders(headers, reject);

        _this3.xhr.onload = function () {
          _this3.xhr.onload = function () {
            resolve(_this3.responseObj("PUT"));
          };
        };

        _this3.xhr.send(JSON.stringify(sentData));
      });
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var _this4 = this;

      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return new Promise(function (resolve, reject) {
        _this4.validationPostRequest(url, reject);

        _this4.xhr.open('DELETE', url, true);

        _this4.setHeaders(headers, reject);

        _this4.xhr.onload = function () {
          if (_this4.xhr.status == 200 && _this4.xhr.readyState == 4) {
            resolve(_this4.responseObj("DELETE"));
          }
        };

        _this4.xhr.send();
      });
    }
  }]);

  return Request;
}();

window.reqto = window.reqTo = window.Reqto = new Request(); // let reqto = new Request()

var _default = Request;
exports.default = _default;