import $ from '../../core/Dom'
import Emitter from '../../core/Emitter'

export default class Excel {
  #element

  constructor(selector, options) {
    this.#element = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOprions = { emitter: this.emitter, store: this.store }

    this.components = this.components.map((Component) => {
      const el = $.create('div', Component.className)
      const component = new Component(el, componentOprions)
      el.html(component.toHTML())

      $root.append(el)
      return component
    })
    return $root
  }

  render() {
    this.#element.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
  }
}
