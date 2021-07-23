import $ from '../src/core/Dom'

describe('DOM test', () => {
  let $el

  test('Dom element should be defined', () => {
    $el = $('selector')
    expect($el.el).toBeDefined()
  })
})
