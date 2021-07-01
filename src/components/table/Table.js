import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/Dom'
import TableSelection from './TableSelection'
import createTable from './table.templ'
import resizeTableHandler from './resize'
// eslint-disable-next-line object-curly-newline
import { isCell, shouldResize, matrix, nextSelector } from './utis'
import * as actions from '../../redux/actions'

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
    console.log($cell)
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeTableHandler(event, this.root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(`Resize error: ${e.message}`)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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

  toHTML() {
    return createTable(100, this.store.getState())
  }
}
