import $ from '../../core/Dom'
import Emitter from '../../core/Emitter'
import StoreSubscriber from '../../core/StoreSubscriber'
import { updateDate } from '../../redux/actions'

export default class Excel {
  #element

  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
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

  init() {
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
    this.subscriber.unsubscribeFromStore()
  }
}
