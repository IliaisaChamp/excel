import $ from '../../core/Dom'
import { isElType } from './utis'

export default function resizeTableHandle(event, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()

  let newWidth
  let newHeight

  const sideProp = isElType('col', event) ? 'bottom' : 'right'
  $resizer.addStyles({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  const resizableCells = $root.findAll(`[data-col="${$parent.dataset.col}"]`)

  document.onmousemove = (e) => {
    if (isElType('col', event)) {
      const delta = e.pageX - coords.right
      newWidth = coords.width + delta
      $resizer.addStyles({
        right: `${-delta}px`,
      })
    } else {
      const delta = e.pageY - coords.bottom
      newHeight = coords.height + delta
      $resizer.addStyles({
        bottom: `${-delta}px`,
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    $resizer.addStyles({
      opacity: 0,
      bottom: 0,
      right: 0,
    })

    if (isElType('col', event)) {
      $parent.addStyles({ width: `${newWidth}px` })
      resizableCells.forEach((el) => {
        el.style.width = `${newWidth}px`
      })
    } else {
      $parent.addStyles({ height: `${newHeight}px` })
    }
  }
}
