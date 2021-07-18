import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/Dom'
import { changeTitle } from '../../redux/actions'
import { defaultTitle } from '../../constants'

export default class Header extends ExcelComponent {
  static className = 'excel-header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  toHTML = () => {
    const { title } = this.store.getState()
    return `
        <input type="text" class="input" value="${title || defaultTitle}" />
            <div>
              <button class="button">
                <i class="material-icons">delete</i>
              </button>
              <button class="button">
                <i class="material-icons">logout</i>
              </button>
            </div>
            `
  }
}
