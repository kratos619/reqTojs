class Request {
    constructor() {
        this.xhr = new XMLHttpRequest;
        this.response = {}
        this.response.config = {}
    }

    setHeaders(headers, reject) {
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

    responseObj(methodType = "") {
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

    get(url, headers = '') {
        return new Promise((resolve, reject) => {
            this.validationPostRequest(url, reject);
            this.xhr.open("GET", url, true);
            this.setHeaders(headers, reject)
            this.xhr.onload = () => {
                if (this.xhr.status == 400 && this.xhr.readyState == 4) {
                    reject(new Error("url Found"))
                }
                if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                    resolve(this.responseObj("GET"))
                }
            }
            this.xhr.send();
        });
    }

    post(url, sentData, headers) {
        return new Promise((resolve, reject) => {
            this.validationPostRequest(url, reject);
            this.xhr.open('POST', url, true);
            this.setHeaders(headers, reject)
            this.xhr.onload = () => {
                resolve(this.responseObj("POST"))
            }
            this.xhr.send(JSON.stringify(sentData))
        })

    }

    put(url, sentData, headers) {
        return new Promise((resolve, reject) => {
            this.validationPostRequest(url, reject);
            this.xhr.open("PUT", url, true);
            this.setHeaders(headers, reject)
            this.xhr.onload = () => {
                this.xhr.onload = () => {
                    resolve(this.responseObj("PUT"))
                }
            }
            this.xhr.send(JSON.stringify(sentData))
        })

    }

    delete(url, headers = '') {
        return new Promise((resolve, reject) => {
            this.validationPostRequest(url, reject);
            this.xhr.open('DELETE', url, true);
            this.setHeaders(headers, reject)
            this.xhr.onload = () => {
                if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                    resolve(this.responseObj("DELETE"));
                }
            }
            this.xhr.send();
        });
    }

}
window.reqto = window.reqTo = window.Reqto = new Request();
// let reqto = new Request()
export default Request();