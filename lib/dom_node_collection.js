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
