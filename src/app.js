module.exports = (function (w, d) {

    class RequestTo {
        constructor() {
            this.xhr = new XMLHttpRequest;
            this.response = {};
            this.response.config = {};
            this.defaultHeaders = {
                "Content-type": "application/json",
                "Accept": "application/json, text/plain, */*",
                "X-Requested-With": "XMLHttpRequest"
            };
            this.error = "";
            this.error.response = "";
        }


        setHeaders(headers, reject) {
            for (let key in this.defaultHeaders) {
                this.xhr.setRequestHeader(key, this.defaultHeaders[key]);
            }
            if (typeof headers == 'object' || headers == '') {
                for (let key in headers) {
                    this.xhr.setRequestHeader(key, headers[key]);
                }
            }
            if (Array.isArray(headers) == true) {
                reject(new Error('headers must be object, key and value pair'));
            }
        }

        validationPostRequest(url, reject) {
            if (!url) {
                reject(new Error("Required URL"));
            }
        }
        headersMap() {
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

        responseObj(methodType = "", responsePost) {

            this.response.data = JSON.parse(this.xhr.responseText);
            this.response.status = this.xhr.status;
            this.response.statusText = this.xhr.statusText;
            this.response.headers = this.headersMap();
            this.response.config.url = this.xhr.responseURL;
            this.response.config.method = methodType;
            this.response.config.headers = this.headersMap();
            this.response.request = this.xhr;
            return this.response;
        }

        responseErrorStatusHandler(statusCode, type, reject) {
            let _errorResObj = {};
            let errorRes = "";
            this.error = "Request failed with status code " + this.xhr.status;
            if (statusCode !== 200) {
                if (statusCode == 204) {
                    _errorResObj.error = this.error;
                    _errorResObj.errorRes = "No content Found";
                    return reject(_errorResObj);
                    // return _errorResObj;
                }
                errorRes = this.responseObj(type);
                _errorResObj.error = this.error;
                _errorResObj.response = errorRes;
                return reject(_errorResObj);
            }
        }

        get(url, headers = this.defaultHeaders) {
            return new Promise((resolve, reject) => {
                this.validationPostRequest(url, reject);
                this.xhr.open("GET", url, true);
                this.setHeaders(headers, reject);
                this.xhr.onload = () => {
                    this.responseErrorStatusHandler(this.xhr.status, "GET", reject);
                    if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                        resolve(this.responseObj("GET"));
                    }
                };
                this.xhr.send();
            });
        }

        post(url, sentData, headers) {
            return new Promise((resolve, reject) => {
                this.validationPostRequest(url, reject);
                this.xhr.open('POST', url, true);
                this.setHeaders(headers, reject);
                this.xhr.onload = () => {
                    this.responseErrorStatusHandler(this.xhr.status, "POST", reject);
                    if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                        resolve(this.responseObj("POST"));
                    }
                };
                this.xhr.send(JSON.stringify(sentData));
            });

        }

        put(url, sentData, headers) {
            return new Promise((resolve, reject) => {
                this.validationPostRequest(url, reject);
                this.xhr.open("PUT", url, true);
                this.setHeaders(headers, reject);
                this.xhr.onload = () => {
                    this.responseErrorStatusHandler(this.xhr.status, "PUT", reject);
                    if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                        resolve(this.responseObj("PUT"));
                    }
                };
                this.xhr.send(JSON.stringify(sentData));
            });

        }

        delete(url, headers) {
            return new Promise((resolve, reject) => {
                this.validationPostRequest(url, reject);
                this.xhr.open('DELETE', url, true);
                this.setHeaders(headers, reject);
                this.xhr.onload = () => {
                    this.responseErrorStatusHandler(this.xhr.status, "DELETE", reject);
                    if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                        resolve(this.responseObj("DELETE"));
                    }
                };
                this.xhr.send();
            });
        }

    }
    // const reqTo = new RequestTo();
    // console.log('inside', reqTo);
    // module.exports = reqTo;
    // return reqTo;
})(window, document);