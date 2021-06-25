import ExcelComponent from '../../core/ExcelComponent'

export default class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  onInput = (event) => {
    console.log(event.target.textContent.trim())
  }

  onClick = (event) => console.log(event.target)

  toHTML = () => `
    <div class="excel-formula__info">
      (fx)
    </div>
      <div class="excel-formula__input" contenteditable="true" spellcheck="false">
    </div>
  `
}
