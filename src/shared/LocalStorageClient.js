import { storage } from '../core/utils'

export default class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return new Promise((res) => {
      const state = storage(this.name)

      setTimeout(() => {
        res(state)
      }, 3000)
    })
  }
}

function storageName(param) {
  return `excel:${param}`
}
