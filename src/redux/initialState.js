import { storage } from '../core/utils'

const dafaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
}

const initialState = storage('excel-state') ? storage('excel-state') : dafaultState

export default initialState
