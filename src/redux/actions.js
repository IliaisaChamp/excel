import {
  TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE
} from './types'

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

function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}

function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  }
}

function updateDate() {
  return {
    type: UPDATE_DATE,
  }
}

export {
  tableResize, changeText, changeStyles, applyStyle, changeTitle, updateDate
}
