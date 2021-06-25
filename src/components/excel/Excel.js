import $ from '../../core/Dom'

export default class Excel {
  #element

  constructor(selector, options) {
    this.$element = $(selector)
    this.components = options.components || []
  }

  getRoot = () => {
    const $root = $.create('div', 'excel')

    this.components.forEach((Component) => {
      const el = $.create('div', Component.className)
      const component = new Component(el)
      el.html(component.toHTML())

      $root.append(el)
    })
    return $root
  }

  render = () => {
    this.#element.append(this.getRoot())
  }
}
