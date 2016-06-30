import { provideRouter, RouterConfig } from '@angular/router'
import { WechatyComponent } from './wechaty.component'
import { MessageComponent } from './message.component'

const routes: RouterConfig = [
  {
    path: 'wechaty'
    , component: WechatyComponent
  }
  // , {
  //   path: 'bot/:id'
  //   , component: BotComponent
  // }
  , {
    path: 'message'
    , component: MessageComponent
  }
  , {
    path: ''
    , redirectTo: '/wechaty'
    // , terminal: true
  }
]

export const APP_ROUTES_PROVIDERS = [
  provideRouter(routes)
]