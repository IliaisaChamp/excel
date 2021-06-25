import ExcelComponent from '../../core/ExcelComponent'

export default class Toolbar extends ExcelComponent {
  static className = 'excel-toolbar'

  toHTML = () => `
     <button class="button">
            <i class="material-icons">format_align_left</i>
          </button>
          <button class="button">
            <i class="material-icons">format_align_center</i>
          </button>
          <button class="button">
            <i class="material-icons">format_align_right</i>
          </button>
          <button class="button">
            <i class="material-icons">format_bold</i>
          </button>
          <button class="button">
            <i class="material-icons">format_italic</i>
          </button>
          <button class="button">
            <i class="material-icons">format_underlined</i>
          </button>
  `
}
