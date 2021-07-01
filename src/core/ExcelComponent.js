import DOMListener from './DOMListener'

export default class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.storeSubscribe = null
    this.unsubscribers = []
    this.prepare()
  }

  // Настройка компонента перед init()
  // eslint-disable-next-line class-methods-use-this
  prepare() {}

  //  возврат шаблона компонента
  toHTML = () => ''

  // $ - означает что метод принадлежит фреймворку
  // интерфейс для работы с эмиттером (уведомление о событии)
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписка на событие event
  $on(event, ...agrs) {
    const unsub = this.emitter.subscribe(event, ...agrs)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSubscribe = this.store.subscribe(fn)
  }

  // инициализация компонента, добавление DOM listeners
  init() {
    this.initDOMListeners()
  }

  // удаление компонента, очистка DOM listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
    this.storeSubscribe.unsubscribe()
  }
}
