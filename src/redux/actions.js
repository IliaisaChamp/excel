import { TABLE_RESIZE } from './types'

function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export { tableResize }
