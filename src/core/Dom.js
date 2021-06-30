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

  html(html) {
    if (typeof html === 'string') {
      this.#el.innerHTML = html
      return this
    }
    return this.#el.innerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.#el.textContent = text
      return this
    }
    if (this.#el.tagName.toLowerCase() === 'input') {
      this.#el.value.trim()
    }
    // eslint-disable-next-line no-return-assign
    return this.#el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  addEvent(eventType, callback) {
    this.#el.addEventListener(eventType, callback)
  }

  removeEvent(eventType, callback) {
    this.#el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.#el
    }
    this.#el.append(node)
  }

  closest = (selector) => $(this.#el.closest(selector))

  getCoords = () => this.#el.getBoundingClientRect()

  findAll = (selector) => this.#el.querySelectorAll(selector)

  find = (selector) => $(this.#el.querySelector(selector))

  getId(parce) {
    if (parce) {
      const [row, col] = this.getId().split(':')
      return {
        row: +row,
        col: +col,
      }
    }
    return this.dataset.id
  }

  addStyles = (styles = {}) => {
    _.keys(styles).forEach((prop) => {
      this.#el.style[prop] = styles[prop]
    })
  }

  addClass(className) {
    this.#el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.#el.classList.remove(className)
    return this
  }

  focus() {
    this.#el.focus()
    return this
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
