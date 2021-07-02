import * as _ from 'lodash'

const shouldResize = (value, event) => _.has(event.target.dataset, value)

const isResizeType = (value, event) => event.target.dataset.resize === value

const isCell = (value, event) => event.target.dataset.type === value

const range = (start, end) => {
  if (start > end) {
    // eslint-disable-next-line no-extra-semi
    ;[end, start] = [start, end]
  }
  return new Array(end - start + 1).fill('').map((_, idx) => start + idx)
}

const matrix = ($target, $current) => {
  const target = $target.getId(true)
  const current = $current.getId(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  const ids = cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])

  return ids
}

function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    default:
      break
  }

  return `[data-id="${row}:${col}"]`
}
// eslint-disable-next-line object-curly-newline
export { isResizeType, shouldResize, isCell, range, matrix, nextSelector }
