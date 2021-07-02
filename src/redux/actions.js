import { TABLE_RESIZE, CHANGE_TEXT } from './types'

function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}

export { tableResize, changeText }
