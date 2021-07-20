/* eslint-disable no-restricted-globals */
import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/Dom'
import { changeTitle } from '../../redux/actions'
import { defaultTitle } from '../../constants'
import ActiveRoute from '../../core/routes/ActiveRoute'

export default class Header extends ExcelComponent {
  static className = 'excel-header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.dataset.button === 'remove') {
      // eslint-disable-next-line no-alert
      const desicion = confirm('Удалить таблицу?')

      if (desicion) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.dataset.button === 'exit') {
      ActiveRoute.navigate('')
    }

    return this
  }

  toHTML = () => {
    const { title } = this.store.getState()
    return `
        <input type="text" class="input" value="${title || defaultTitle}" />
            <div>
              <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
              </div>
              <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">logout</i>
              </div>
            </div>
            `
  }
}
