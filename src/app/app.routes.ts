import { provideRouter, RouterConfig } from '@angular/router'

import { ABOUT_ROUTES }     from './+about.component/index'
import { LOGIN_ROUTES }     from './login.component/index'
import { BOTIE_ROUTES }     from './botie.component/index'
import { BOT_LIST_ROUTES }  from './bot-list.component/index'
import { BOT_ROUTES }       from './bot.component/index'

const routes: RouterConfig = [
  ... ABOUT_ROUTES
  , ... LOGIN_ROUTES
  , ... BOTIE_ROUTES
  , ... BOT_LIST_ROUTES
  , ... BOT_ROUTES

  , {
    path: ''
    , pathMatch: 'full'
    , redirectTo: '/about'
  }
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
]
