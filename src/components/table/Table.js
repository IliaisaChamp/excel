import ExcelComponent from '../../core/ExcelComponent'
import createTable from './table.templ'

export default class Table extends ExcelComponent {
  static className = 'excel-table'

  toHTML = () => createTable()
}
