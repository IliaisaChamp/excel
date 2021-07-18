import { defaultStyles, defaultTitle } from '../constants'
import { storage } from '../core/utils'

const dafaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})
const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : dafaultState

export default initialState
