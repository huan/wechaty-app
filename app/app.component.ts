import { Component, OnInit, OnDestroy } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

import { WechatyComponent } from './wechaty.component'

@Component({
  moduleId: module.id
  , selector: 'app'
  , templateUrl: 'app.component.html'

  , directives: [
    WechatyComponent
    , ROUTER_DIRECTIVES
  ]
  // , styleUrls: ['app/app.component.css']
  // , providers: [HeroService]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Hello Wechaty'

  constructor() {
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
}