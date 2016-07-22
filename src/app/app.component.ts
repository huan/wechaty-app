import {
  Component
  , Inject
  , OnInit
  , OnDestroy
} from '@angular/core'
import { ROUTER_DIRECTIVES, Router } from '@angular/router'

import { Brolog } from 'brolog'

import { WechatyComponent }  from './wechaty.component/index'
import { AuthService }       from './auth.service/index'

import { Brolog } from 'brolog'

@Component({
  moduleId: module.id
  , selector: 'app-root'
  , templateUrl: 'app.component.html'
  , styleUrls: ['app.component.css']
  , directives: [
    WechatyComponent
    , ROUTER_DIRECTIVES
  ]
  , providers: [
    AuthService
  ]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Wechaty APP -  Cloud Manager for your ChatBot'

  constructor(
    private authService: AuthService
    , private router: Router
    , private log: Brolog
   ) {
    this.log.verbose('App', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('App', 'ngOnInit()')

    let link = ['/login']
    if (this.authService.authed()) {
      link = ['/bot', "1"]
    }
    this.router.navigate(link)
  }

  ngOnDestroy() {
    this.log.verbose('App', 'ngOnDestroy()')
  }

  logout() {
    this.log.verbose('App', 'logout()')
    this.authService.logout()
  }
}
