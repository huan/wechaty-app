import { Component, OnInit } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

import { WechatyComponent } from './wechaty.component'

@Component({
  moduleId: module.id
  , selector: 'app'
  , templateUrl: 'app.component.html'

  , directives: [
    WechatyComponent
    // ， ROUTER_DIRECTIVES
  ]
  // , styleUrls: ['app/app.component.css']
  // , providers: [HeroService]
})

export class AppComponent implements OnInit {
  title = 'Hello Wechaty'

  constructor() {

  }

  ngOnInit() {

  }

  log(e) {
    console.log(e)
  }
}