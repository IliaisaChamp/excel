import createToolbar from './toolbar.templ'
import $ from '../../core/Dom'
import ExcelStateComponent from '../../core/ExcelStateComponent'
import { defaultStyles } from '../../constants'

export default class Toolbar extends ExcelStateComponent {
  static className = 'excel-toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  // eslint-disable-next-line class-methods-use-this
  get template() {
    return createToolbar(this.state)
  }

  // eslint-disable-next-line class-methods-use-this
  onClick(event) {
    const $target = $(event.target)
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles)
  }

  toHTML = () => this.template
}
