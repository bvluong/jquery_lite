const DOMNodeCollection = require('./dom_node_collection');

  let callbacks = [];

  window.$l = function (selector) {
  let nodeList = [];
  if (selector instanceof String || typeof selector === 'string') {
    nodeList = document.querySelectorAll(selector);
    let array = Array.from(nodeList);
    return new DOMNodeCollection(array);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if ( selector instanceof Function) {
    callbacks.push(selector);
  }
};

  window.$l.extend = function (...args) {
    args.slice(1).forEach ( (obj) => {
      for (var key in obj) {
        args[0][key] = obj[key];
      }
    });
    return args[0];
  };

  window.$l.ajax = function (options) {
    let defaults = {
      success: () => {},
      error: () => {},
      url: "",
      method: "GET",
      data: {},
      contentType: "JSON"
    };
    let options = $l.extend(defaults,options);


    const xhr = new XMLHttpRequest();

    // step 2 - specify path and verb
    xhr.open(options.method, options.url);

    // step 3 - register a callback
    xhr.onload = e => {
      if (xhr.status === 200) {
        options.success(xhr.response)
      } else {
        options.error(xhr.response)
      }
      console.log(xhr.responseType) //the type of data that was returned

    }

    // step 4 - send off the request with optional data
    xhr.send();



  };


document.addEventListener('DOMContentLoaded', () => (callbacks.forEach ((cb) => cb()) ) );
