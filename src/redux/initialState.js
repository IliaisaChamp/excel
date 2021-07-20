import { defaultStyles, defaultTitle } from '../constants'

const dafaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  createDate: new Date().toJSON()
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export default function normalizeInitialState(state) {
  return state ? normalize(state) : dafaultState
}
