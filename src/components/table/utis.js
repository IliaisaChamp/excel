import * as _ from 'lodash'

const shouldResize = (value, event) => _.has(event.target.dataset, value)

const isElType = (value, event) => event.target.dataset.resize === value

export { isElType, shouldResize }
