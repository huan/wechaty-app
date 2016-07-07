import { provideRouter, RouterConfig } from '@angular/router'
import { WechatyComponent } from './wechaty.component'
import { MessageComponent } from './message.component'

const routes: RouterConfig = [
  { path: 'wechaty',    component: WechatyComponent }
  , { path: 'message',  component: MessageComponent }

  , { path: '',         redirectTo: '/wechaty' }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]
