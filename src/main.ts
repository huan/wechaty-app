import { bootstrap }      from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
// import { HTTP_PROVIDERS } from '@angular/http'
import {disableDeprecatedForms, provideForms} from '@angular/forms'

import { AppComponent, environment, APP_ROUTER_PROVIDERS }  from './app'

if (environment.production) {
  enableProdMode()
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS
  // HTTP_PROVIDERS
  , disableDeprecatedForms()
  , provideForms()
])
.catch(err => console.error(err))
