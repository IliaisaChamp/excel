import $ from '../../core/Dom'
import { isResizeType } from './utis'

export default function resizeTableHandler(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    let newWidth
    let newHeight

    const sideProp = isResizeType('col', event) ? 'bottom' : 'right'
    $resizer.addStyles({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    const resizableCells = $root.findAll(`[data-col="${$parent.dataset.col}"]`)

    document.onmousemove = (e) => {
      if (isResizeType('col', event)) {
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

      if (isResizeType('col', event)) {
        $parent.addStyles({ width: `${newWidth}px` })
        resizableCells.forEach((el) => {
          el.style.width = `${newWidth}px`
        })
      } else {
        $parent.addStyles({ height: `${newHeight}px` })
      }

      resolve({
        value: newWidth,
        id: isResizeType('col', event) ? $parent.dataset.col : null,
      })
    }
  })
}
