'use strict';
const reqto = function (s, e) {
    class t {
        constructor() {
            this.xhr = new XMLHttpRequest, this.response = {}, this.response.config = {}, this.defaultHeaders = {
                "Content-type": "application/json",
                Accept: "application/json, text/plain, */*",
                "X-Requested-With": "XMLHttpRequest"
            }, this.error = {}, this.error.response = {}
        }
        setHeaders(s, e) {
            for (let s in this.defaultHeaders) this.xhr.setRequestHeader(s, this.defaultHeaders[s]);
            if ("object" == typeof s || "" == s)
                for (let e in s) this.xhr.setRequestHeader(e, s[e]);
            1 == Array.isArray(s) && e(new Error("headers must be object, key and value pair"))
        }
        validationPostRequest(s, e) {
            s || e(new Error("Required URL"))
        }
        headersMap() {
            var s = this.xhr.getAllResponseHeaders().trim().split(/[\r\n]+/),
                e = {};
            return s.forEach(function (s) {
                var t = s.split(": "),
                    r = t.shift(),
                    h = t.join(": ");
                e[r] = h
            }), e
        }
        responseObj(s = "", e) {
            return this.response.data = JSON.parse(this.xhr.responseText), this.response.status = this.xhr.status, this.response.statusText = this.xhr.statusText, this.response.headers = this.headersMap(), this.response.config.url = this.xhr.responseURL, this.response.config.method = s, this.response.config.headers = this.headersMap(), this.response.request = this.xhr, this.response
        }
        responseErrorStatusHandler(s, e, t) {
            let r = {},
                h = "";
            if (this.error = "Request failed with status code " + this.xhr.status, 200 !== s) return 204 == s ? (r.error = this.error, r.errorRes = "No content Found", t(r)) : (h = this.responseObj(e), r.error = this.error, r.response = h, t(r))
        }
        get(s, e = this.defaultHeaders) {
            return new Promise((t, r) => {
                this.validationPostRequest(s, r), this.xhr.open("GET", s, !0), this.setHeaders(e, r), this.xhr.onload = (() => {
                    this.responseErrorStatusHandler(this.xhr.status, "GET", r), 200 == this.xhr.status && 4 == this.xhr.readyState && t(this.responseObj("GET"))
                }), this.xhr.send()
            })
        }
        post(s, e, t) {
            return new Promise((r, h) => {
                this.validationPostRequest(s, h), this.xhr.open("POST", s, !0), this.setHeaders(t, h), this.xhr.onload = (() => {
                    this.responseErrorStatusHandler(this.xhr.status, "POST", h), 200 == this.xhr.status && 4 == this.xhr.readyState && r(this.responseObj("POST"))
                }), this.xhr.send(JSON.stringify(e))
            })
        }
        put(s, e, t) {
            return new Promise((r, h) => {
                this.validationPostRequest(s, h), this.xhr.open("PUT", s, !0), this.setHeaders(t, h), this.xhr.onload = (() => {
                    this.responseErrorStatusHandler(this.xhr.status, "PUT", h), 200 == this.xhr.status && 4 == this.xhr.readyState && r(this.responseObj("PUT"))
                }), this.xhr.send(JSON.stringify(e))
            })
        }
        delete(s, e) {
            return new Promise((t, r) => {
                this.validationPostRequest(s, r), this.xhr.open("DELETE", s, !0), this.setHeaders(e, r), this.xhr.onload = (() => {
                    this.responseErrorStatusHandler(this.xhr.status, "DELETE", r), 200 == this.xhr.status && 4 == this.xhr.readyState && t(this.responseObj("DELETE"))
                }), this.xhr.send()
            })
        }
    }
    return s.reqTo = s.reqto = new t, new t
}(window, document);
export default reqto;