/* eslint-disable import/prefer-default-export */
export function capitalize(str) {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// eslint-disable-next-line consistent-return
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function camelToDashCase(str) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}:${styles[key]}`)
    .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return (...args) => {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
