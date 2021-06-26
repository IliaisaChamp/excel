const shouldResize = (event) => event.target.dataset.resize

const isElType = (value, event) => event.target.dataset.resize === value

export { isElType, shouldResize }
