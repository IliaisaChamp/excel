import * as _ from 'lodash'

class Dom {
  #el

  constructor(selector) {
    this.#el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  get el() {
    return this.#el
  }

  get dataset() {
    return this.#el.dataset
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

  event = (eventType, callback) => this.#el.addEventListener(eventType, callback)

  removeEvent = (eventType, callback) => this.#el.removeEventListener(eventType, callback)

  append = (node) => {
    if (node instanceof Dom) {
      node = node.#el
    }
    this.#el.append(node)
  }

  closest = (selector) => $(this.#el.closest(selector))

  getCoords = () => this.#el.getBoundingClientRect()

  findAll = (selector) => this.#el.querySelectorAll(selector)

  addStyles = (styles = {}) => {
    _.keys(styles).forEach((prop) => {
      this.#el.style[prop] = styles[prop]
    })
  }
}

function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

export default $
