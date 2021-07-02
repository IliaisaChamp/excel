import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Excel from './components/excel/Excel'
import Formula from './components/formula/Formula'
import Header from './components/header/Header'
import Table from './components/table/Table'
import Toolbar from './components/toolbar/Toolbar'
import createStore from './core/createStore'
import { storage } from './core/utils'
import initialState from './redux/initialState'
import rootReducer from './redux/rootReducer'
import './styles/index.scss'

const store = createStore(rootReducer, initialState)

store.subscribe((state) => {
  console.log(state)
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
