class Dom {
  #el

  constructor(selector) {
    this.#el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html = (html) => {
    if (typeof html === 'string') {
      this.#el.innerHTML = html
      return this
    }
    return this.#el.innerHTML.trim()
  }

  clear = () => {
    this.html('')
    return this
  }

  append = (node) => {
    // if (Element.prototype.append) {
    //   this.#el.append(node.#el)
    // } else {
    //   this.#el.appendChiled(node.#el)
    // }
    if (node instanceof Dom) {
      node = node.#el
    }
    this.#el.append(node)
  }
}

const $ = (selector) => new Dom(selector)

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

export default $
