const CODES = {
  A: 65,
  Z: 90,
}

function createRow(idx, content) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
          ${idx || ''}
          ${resize}
        </div>
       <div class="row-data">${content}</div>
    </div>
    `
}

function createCol(col, colIndex) {
  return `
    <div class="column" data-type="resizable" data-col="${colIndex}">
      ${col}
      <div class="column-resize" data-resize="col"></div>
    </div>`
}

function createCell(_, colIndex) {
  return `<div class="cell" contenteditable="true" data-col="${colIndex}"></div>`
}

export default function createTable(rowsCount = 100) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map((el, idx) => String.fromCharCode(CODES.A + idx))
    .map(createCol)
    .join('')

  rows.push(createRow(null, cols))

  const cells = new Array(colsCount).fill('').map(createCell).join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
