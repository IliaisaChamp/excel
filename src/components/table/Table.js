import ExcelComponent from '../../core/ExcelComponent'
import createTable from './table.templ'
import resizeTableHandle from './resize'
import { shouldResize } from './utis'

export default class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  onMousedown = (event) => {
    if (shouldResize(event)) {
      resizeTableHandle(event, this.root)
    }
  }

  // onMousemove = (event) => console.log('mousemove', event.target)

  // onMouseup = (event) => console.log('mouseup', event.target)

  toHTML = () => createTable()
}
