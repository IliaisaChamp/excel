import ExcelComponent from '../../core/ExcelComponent'

export default class Formula extends ExcelComponent {
  static className = 'excel-formula'

  toHTML = () => `
    <div class="excel-formula__info">
            (fx)
          </div>
          <div class="excel-formula__input" contenteditable="true" spellcheck="false">
          </div>
  `
}
