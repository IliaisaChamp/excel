const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120

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
  // style="width:${width}"
  return `
    <div class="column" data-type="resizable" data-col="${colIndex}">
      ${col}
      <div class="column-resize" data-resize="col"></div>
    </div>`
}

function createCell(row) {
  // eslint-disable-next-line func-names
  return function (_, colIndex) {
    return `
    <div
      class="cell"
      contenteditable="true"
      data-col="${colIndex}"
      data-type="cell"
      data-id="${row}:${colIndex}">
    </div>`
  }
}

function getWidth(state, index) {
  return `${state[index] || DEFAULT_WIDTH}px`
}

export default function createTable(rowsCount = 30, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map((el, idx) => String.fromCharCode(CODES.A + idx))
    // .map((col, index) => {
    //   const width = getWidth(state.colState, index)
    //   return createCol(col, index, width)
    // })
    .map(createCol)
    .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(createCell(row)).join('')
    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
