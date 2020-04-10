const axios = require("axios");

const httpControllerHolder = {
  get: (url,headers, data) => httpControllerHolder.request("GET", url,headers, data),
  post: (url,headers, data) => httpControllerHolder.request("POST", url,headers, data),
  delete: (url,headers, data) => httpControllerHolder.request("DELETE", url,headers, data),
  put: (url,headers, data) => httpControllerHolder.request("PUT", url,headers, data),

  // Send a request
  request: (method, url, headers, data) =>
    axios({ method, url, headers, data})
      .then(response => response["data"])
      .catch(error => {
        return error;
      })
};
module.exports = httpControllerHolder;
