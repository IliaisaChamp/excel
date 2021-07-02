import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/Dom'

export default class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  init() {
    super.init()

    this.$formula = this.root.find('#formula')

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text())
    })
  }

  storeChanged({ currentText }) {
    console.log(currentText)
    this.$formula.text(currentText)
  }

  onInput = (event) => {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown = (event) => {
    const keys = ['Enter', 'Tab']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  toHTML = () => `
    <div class="excel-formula__info">
      (fx)
    </div>
      <div id="formula" class="excel-formula__input" contenteditable="true" spellcheck="false">
    </div>
  `
}
