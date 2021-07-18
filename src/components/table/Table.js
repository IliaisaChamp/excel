import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/Dom'
import TableSelection from './TableSelection'
import createTable from './table.templ'
import resizeTableHandler from './resize'
// eslint-disable-next-line object-curly-newline
import { isCell, shouldResize, matrix, nextSelector } from './utis'
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constants'
import parse from '../../core/parse'

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
      this.selection.current
        .attr('data-value', text)
        .text(parse(text))

      this.updateTextinStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        }),
      )
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

  updateTextinStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.getId(),
        value,
      }),
    )
  }

  onInput(event) {
    this.updateTextinStore($(event.target).text())
  }

  selectCell(cell) {
    this.selection.select(cell)
    this.$emit('table:select', cell)

    const styles = cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  toHTML = () => createTable(100, this.store.getState())
}
