

var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, headers, async) {
    // make sure that every call of over HTTPS
    url = url.replace('http://', 'https://');

    // make sure to remove any obsolete port 80 in the URL
    url = url.replace(':80', '');

    // Some services give us an internal network address :'(
    url = url.replace('10.146.230.17:7002', 'checkecert.nl');

    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x)
        }
    };
    var keys = Object.keys(headers);
    for(var i=0; i<keys.length; i++){
      var key = keys[i];
      x.setRequestHeader(key, headers[key]);
    }
    x.send(data)
};
module.exports = ajax;
