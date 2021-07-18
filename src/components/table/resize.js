import $ from '../../core/Dom'
import { isResizeType } from './utis'

export default function resizeTableHandler(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const type = $resizer.dataset.resize
    const coords = $parent.getCoords()

    let newSize

    const sideProp = isResizeType('col', event) ? 'bottom' : 'right'
    $resizer.addStyles({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    const resizableCells = $root.findAll(`[data-col="${$parent.dataset.col}"]`)

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        newSize = Math.round(coords.width + delta)
        $resizer.addStyles({
          right: `${-delta}px`,
        })
      } else {
        const delta = e.pageY - coords.bottom
        newSize = Math.round(coords.height + delta)
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

      if (type === 'col') {
        $parent.addStyles({ width: `${newSize}px` })
        resizableCells.forEach((el) => {
          el.style.width = `${newSize}px`
        })
      } else {
        $parent.addStyles({ height: `${newSize}px` })
      }

      resolve({
        value: newSize,
        type,
        id: $parent.dataset[type],
      })
    }
  })
}
