import $ from '../core/Dom'

export default function Loader() {
  return $.create('div', 'loader').html(
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  )
}
