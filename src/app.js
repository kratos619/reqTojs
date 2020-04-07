(function (w, d) {
    class Request {
        constructor() {
            this.xhr = new XMLHttpRequest
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

        get(url, headers = '') {
            return new Promise((resolve, reject) => {
                this.validationPostRequest(url, reject);
                this.xhr.open("GET", url, true);
                this.setHeaders(headers, reject)
                this.xhr.onload = () => {
                    let response;
                    if (this.xhr.status == 400 && this.xhr.readyState == 4) {
                        reject(new Error("url Found"))
                    }
                    if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                        response = this.xhr.responseText;
                        resolve(response)
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
                    let response;
                    response = this.xhr.responseText;
                    resolve(response)
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
                    let response;
                    response = this.xhr.responseText;
                    resolve(response)
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
                    let response;
                    if (this.xhr.status == 200 && this.xhr.readyState == 4) {
                        response = this.xhr.responseText;
                        resolve(response)
                    }
                }
                this.xhr.send();
            });
        }

    }

    w.reqto = w.reqTo = w.Reqto = new Request();
})(window, document)