import DOMListener from './DOMListener'

export default class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
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

  // инициализация компонента, добавление DOM listeners
  init() {
    this.initDOMListeners()
  }

  // удаление компонента, очистка DOM listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
