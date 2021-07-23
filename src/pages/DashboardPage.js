import Page from '../core/page/Page'
import $ from '../core/Dom'
import createRecordsTable from '../shared/dashboardFunctions'

export default class DashboardPage extends Page {
  // eslint-disable-next-line class-methods-use-this
  getRoot() {
    const id = Date.now().toString()
    return $.create('div', 'db').html(
      `
        <div class="db__header">
          <h1>Панель управления</h1>
        </div>
        <div class="db__new">
          <div class="db__view">
            <a href="#excel/${id}" class="db__create"> Новая таблица </a>
          </div>
        </div>
        <div class="db__table db__view">
          ${createRecordsTable()}
        </div>
    `,
    )
  }
}
