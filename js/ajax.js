
let ajax = {};

ajax.fetch = function (data, responseType) {
  let http = new XMLHttpRequest(),
      method = 'GET',
      path,
      param = '',
      callback;

  if (typeof data == 'string')
    data = { path: data };

  if (!data || typeof data != 'object')
    return Promise.reject(new TypeError("first argument is not an object or string."));

  path = data.path;

  if (typeof path != "string")
    return Promise.reject(new Error("path not found"));

  try {
    method = data.method.toUpperCase() || method;
  } catch (e) {
    method = undefined;
  } finally {
    if (method == null) method = 'GET';
    if (method !== 'GET' && method !== 'POST')
      throw new Error('unknown method.');
  }

  for (let key in data.param)
    if (data.param.hasOwnProperty(key)) {
      switch (typeof data.param[key]) {
        case 'string':
        case 'number':
          data.param[key] = String(data.param[key]);
          break;
        default:
          data.param[key] = JSON.stringify(data.param[key]);
      }
      param += key + '=' + encodeURIComponent(data.param[key]) + '&';
    }

  param = param.slice(0, param.length - 1);

  if (param && method === 'GET') {
    path += '?' + param;
    param = 0;
  }

  param = param || undefined;

  switch (typeof data.callback) {
    case 'function':
      callback = data.callback;
      break;
    case 'string':
      callback = Function(data.callback);
      break;
    default:
      callback = function () {};
  }

  http.open(method, path, true);

  if (method === 'POST')
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  return new Promise(function(resolve, reject) {
    function resolveAndCallback (result) {
      callback(result);
      resolve(result);
    }
    function rejectAndCallback (error) {
      callback(error);
      reject(error);
    }
    http.onreadystatechange = function () {
      if (http.readyState == 4) {
        if (http.status == 200) {
          let result = http.responseText;
          switch (responseType) {
            case JSON:
              try {
                result = JSON.parse(result);
              } catch (e) {
                rejectAndCallback(e);
                return;
              }
              break;

            case HTMLElement:
              result = (function () {
                let elem = document.createElement('div');
                elem.innerHTML = result;
                return elem.childNodes;
              })();

            default:
              break;
          }
          resolveAndCallback(result);
        } else {
          rejectAndCallback(new Error("Response error. \n HTTP Status: " + http.status));
        }
      }
    };

    http.send(param);
  });
}

ajax.fetchText = function (obj) {
  return ajax.fetch(obj);
}

ajax.fetchJSON = function (obj) {
  return ajax.fetch(obj, JSON);
}

ajax.fetchHTML = function (obj) {
  return ajax.fetch(obj, HTMLElement);
}


ajax.sendFiles = function (data) {
  if (!window.FormData) return false;

  let http = new XMLHttpRequest(),
      formData = new FormData(),
      path = data.path,
      files = data.files,
      param = '',
      callback;

  if (!data.path)
    return Promise.reject(new Error("path not found"));

  for (let i = 0; i < files.length; i++)
    formData.append('uploadfile' + i, files[i]);

  switch (typeof data.callback) {
    case 'function':
      callback = data.callback;
      break;
    case 'string':
      callback = Function(data.callback);
      break;
    default:
      callback = function () {};
  }

  http.open('POST', path, true);

  return new Promise(function(resolve, reject) {
    http.onreadystatechange = function () {
      if (http.readyState == 4) {
        if (http.status == 200) {
          callback(http.responseText);
          resolve(http.responseText);
        } else {
          let error =  new Error("Response error. \n HTTP Status: " + http.status);
          callback(error);
          reject(error);
        }
      }
    };

    http.send(formData);
  });
}
