import { CHANGE_TEXT, TABLE_RESIZE } from './types'

export default function rootReducer(state, action) {
  let field
  let prevState

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}

      prevState[action.data.id] = action.data.value
      return { ...state, [field]: prevState }

    case CHANGE_TEXT:
      prevState = state.dataState || {}
      prevState[action.data.id] = action.data.text
      return { ...state, currentText: action.data.text, dataState: prevState }

    default:
      return state
  }
}
