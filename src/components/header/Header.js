import ExcelComponent from '../../core/ExcelComponent'

export default class Header extends ExcelComponent {
  static className = 'excel-header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      // listeners: ['input', 'click'],
      ...options,
    })
  }

  toHTML = () => `
      <input type="text" class="input" value="Новая таблица" />
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
