import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/Dom'
import TableSelection from './TableSelection'
import createTable from './table.templ'
import resizeTableHandle from './resize'
// eslint-disable-next-line object-curly-newline
import { isCell, shouldResize, matrix, nextSelector } from './utis'

export default class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeTableHandle(event, this.root)
    } else if (isCell('cell', event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const { current } = this.selection
        const $cells = matrix($target, current).map((id) => this.root.find(`[data-id="${id}"`))

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.getId(true)
      const $next = this.root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  selectCell(cell) {
    this.selection.select(cell)
    this.$emit('table:select', cell)
  }

  toHTML = () => createTable()
}
