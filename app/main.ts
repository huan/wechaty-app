import { bootstrap }            from '@angular/platform-browser-dynamic'
import { HTTP_PROVIDERS }       from '@angular/http'

import { WechatyComponent }     from './wechaty.component'
import { APP_ROUTES_PROVIDERS } from './app.routes'

bootstrap(
  WechatyComponent
  , [
    APP_ROUTES_PROVIDERS
    , HTTP_PROVIDERS
  ]
)
