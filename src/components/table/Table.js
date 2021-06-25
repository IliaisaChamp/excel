import ExcelComponent from '../../core/ExcelComponent'

export default class Table extends ExcelComponent {
  static className = 'excel-table'

  toHTML = () => `
  <div class="row">
            <div class="row-info">
            </div>
            <div class="row-data">
              <div class="column">A</div>
              <div class="column">B</div>
              <div class="column">C</div>
            </div>
          </div>

          <div class="row">
            <div class="row-info"> 1
            </div>
            <div class="row-data">
              <div class="cell selected" contenteditable="true">A1</div>
              <div class="cell" contenteditable="true">B2</div>
              <div class="cell" contenteditable="true">C3</div>
            </div>
          </div>

           <div class="row">
            <div class="row-info"> 1
            </div>
            <div class="row-data">
              <div class="cell" contenteditable="true">A1</div>
              <div class="cell" contenteditable="true">B2</div>
              <div class="cell" contenteditable="true">C3</div>
            </div>
          </div>
  `
}
