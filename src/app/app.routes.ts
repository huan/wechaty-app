import { provideRouter, RouterConfig } from '@angular/router'

import { AboutRoutes }    from './+about.component/index'
import { LoginRoutes }    from './login.component/index'
import { MessageRoutes }  from './message.component/index'
import { BotListRoutes }  from './bot-list.component/index'
import { BotRoutes }      from './bot.component/index'

const routes: RouterConfig = [
  ... AboutRoutes
  , ... LoginRoutes
  , ... MessageRoutes
  , ... BotListRoutes
  , ... BotRoutes

  , { path: '', redirectTo: '/about' }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]
