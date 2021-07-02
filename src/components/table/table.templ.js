const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return `${state[index] || DEFAULT_WIDTH}px`
}

function getHeight(state, index) {
  return `${state[index] || DEFAULT_HEIGHT}px`
}
function createRow(idx, content, state) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, idx)

  return `
    <div class="row" data-type="resizable" data-row="${idx}" style="height:${height}">
        <div class="row-info">
          ${idx || ''}
          ${resize}
        </div>
       <div class="row-data">${content}</div>
    </div>
    `
}

function createCol({ col, colIndex, width }) {
  return `
    <div class="column" data-type="resizable" data-col="${colIndex}"  style="width:${width}">
      ${col}
      <div class="column-resize" data-resize="col"></div>
    </div>`
}

function createCell(state, row) {
  return (_, colIndex) => {
    const width = getWidth(state.colState, colIndex)
    const id = `${row}:${colIndex}`
    const data = state.dataState[id] || ''
    return `
      <div
        class="cell"
        contenteditable="true"
        data-col="${colIndex}"
        data-type="cell"
        data-id="${id}"
        style="width:${width}"
        >${data}</div>`
  }
}

function getWidthFrom(state) {
  return (col, colIndex) => ({
    col,
    colIndex,
    width: getWidth(state.colState, colIndex),
  })
}

export default function createTable(rowsCount = 30, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map((el, idx) => String.fromCharCode(CODES.A + idx))
    .map(getWidthFrom(state))
    .map(createCol)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(createCell(state, row)).join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
