import { capitalize } from './utils'

export default class DOMListener {
  #root

  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`Не определен корневой элемент для ${this.name}`)
    }
    this.#root = $root
    this.listeners = listeners
  }

  get root() {
    return this.#root
  }

  initDOMListeners = () => {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Метод: ${method} не определен в компоненте: ${this.name} `)
      }
      this[method] = this[method].bind(this)
      this.#root.event(listener, this[method])
    })
  }

  removeDOMListeners = () => {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.#root.removeEvent(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
