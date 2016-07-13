import { provideRouter, RouterConfig } from '@angular/router'
import { WechatyComponent } from './wechaty.component'

import { AboutRoutes }     from './+about.component/index'
import { LoginoutRoutes }  from './loginout.component/index'
import { MessageRoutes }   from './message.component/index'
import { BotListRoutes }   from './bot-list.component/index'
import { BotRoutes }       from './bot.component/index'

const routes: RouterConfig = [
  ... AboutRoutes
  , ... LoginoutRoutes
  , ... MessageRoutes
  , ... BotListRoutes
  , ... BotRoutes

  , { path: '', redirectTo: '/login' }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]
