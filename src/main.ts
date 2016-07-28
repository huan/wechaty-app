import { bootstrap }      from '@angular/platform-browser-dynamic'
import { provide, enableProdMode } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'
import { disableDeprecatedForms, provideForms } from '@angular/forms'
import { APP_BASE_HREF } from '@angular/common'

import { Brolog } from 'brolog'

import { AppComponent, environment, APP_ROUTER_PROVIDERS }  from './app'
import { AuthService } from './app/auth.service/index'
import { AuthGuardService } from './app/auth-guard.service/index'

if (environment.production) {
  enableProdMode()
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS
  , APP_ROUTER_PROVIDERS
  // , provide(APP_BASE_HREF, {useValue : '/' })
  , AuthService
  , AuthGuardService
  , Brolog('silly')
  , disableDeprecatedForms()
  , provideForms()
])
.catch(err => console.error(err))
