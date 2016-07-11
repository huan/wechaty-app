import { Component, OnInit, OnDestroy } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

import { WechatyComponent }  from './wechaty.component/index'
import { AuthService }       from './auth.service/index'

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
   ) {
    console.log('app constructor')
  }

  ngOnInit() {
    console.log('app oninit')
  }

  ngOnDestroy() {
    console.log('app ondestroy')
  }

  log(e) {
    console.log(e)
  }

  logout() {
    this.authService.logout()
  }
}
