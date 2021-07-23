/* eslint-disable max-classes-per-file */
import Router from '../src/core/routes/Router'
import Page from '../src/core/Page'

class DachboardPage extends Page {
  // eslint-disable-next-line class-methods-use-this
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class ExcelPage extends Page {}

describe('router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DachboardPage,
      excel: ExcelPage,
    })
  })

  test('router should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render dashboard page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
