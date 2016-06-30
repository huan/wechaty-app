import { provideRouter, RouterConfig } from '@angular/router'
import { WechatyComponent } from './wechaty.component'

const routes: RouterConfig = [
  {
    path: 'wechaty'
    , component: WechatyComponent
  }
  // , {
  //   path: 'bot/:id'
  //   , component: BotComponent
  // }
  // , {
  //   path: 'dashboard'
  //   , component: DashboardComponent
  // }
  , {
    path: ''
    , redirectTo: '/wechaty'
    // , terminal: true
  }
]

export const APP_ROUTES_PROVIDERS = [
  provideRouter(routes)
]