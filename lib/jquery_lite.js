/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html (string) {
    if (string) {
      this.array.forEach((el) => {
        el.textContent = string;
      });
    } else {
      return this.array[0].textContent;
    }
  }

  empty() {
    this.array.forEach((el) => {
      el.this.html("");
    });
  }

  append(element) {

    if (element instanceof HTMLElement) {
      this.array.forEach((el) => {
        el.appendChild(element.cloneNode());
      });
    } else if (element instanceof String || typeof element === 'string') {
      this.array.forEach((el) => {
        el.innerHTML = element;
      });
    } else {
      this.array.forEach((el) => {
        element.array.forEach((child) => (
          el.appendChild(child.cloneNode())
        ));
      });
    }



  }

  attr(key,value) {
    if (value) {
      this.array.forEach((el) => {
        el.setAttribute(key,value);
      });
    } else {
      return this.array[0].attribute;
    }

  }

  addClass (value) {
    this.array.forEach((el) => {
      value = el.className + " " + value;
      el.setAttribute("class",value);
    });
  }

  removeClass (value) {
    this.array.forEach((el) => {
      const classArr = el.className.split(' ');
      const idx = classArr.indexOf(value);

      value = classArr.remove(idx).join(' ');
      el.setAttribute("class",value);
    });
  }

  children () {
    let newarr = [];
    this.array.forEach((el) => {
      newarr.push(el.children);
    });
    return new DOMNodeCollection(newarr);
  }

  parent () {
    let newarr = [];
    this.array.forEach((el) => {
      newarr.push(el.parentElement);
    });
    return new DOMNodeCollection(newarr);
  }

  find (selector) {
    let newarr = [];
    this.array.forEach((el) => {
      newarr.push(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(newarr);
  }

  remove () {
    const childArr = this.array.slice();
    const parentArr = this.parent().array;
    for (var i = 0; i < parentArr.length; i++) {
        parentArr[i].removeChild(childArr[i]);
      }
  }

  on (type, callback) {
    this.callback = callback;
    this.array.forEach( (htmlele) => (
      htmlele.addEventListener(type,callback)
    ));
  }

  off (type) {
    this.array.forEach( (htmlele) => (
      htmlele.removeEventListener(type,this.callback)
    ));

  }


}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);