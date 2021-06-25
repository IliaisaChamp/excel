export default class DOMListener {
  constructor(root) {
    if (!root) {
      throw new Error('Нет корневого элемента')
    }
    this.$root = root
  }
}
