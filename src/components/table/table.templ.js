const CODES = {
  A: 65,
  Z: 90,
}

function createRow(idx, content) {
  return `
    <div class="row">
        <div class="row-info">${idx || ''}</div>
       <div class="row-data">${content}</div>
    </div>
    `
}
function createCol(col) {
  return `<div class="column">${col}</div>`
}

function createCell(content) {
  return `<div class="cell" contenteditable="true">${content}</div>`
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
