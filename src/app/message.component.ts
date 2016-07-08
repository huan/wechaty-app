import { Component, OnInit, OnDestroy } from '@angular/core'
import { ROUTER_DIRECTIVES } from '@angular/router'

// import { WechatyComponent } from './wechaty.component'

@Component({
  moduleId: module.id
  , selector: 'message'
  , templateUrl: 'message.component.html'

  , directives: [
    // WechatyComponent
    // ， ROUTER_DIRECTIVES
  ]
  // , styleUrls: ['app/app.component.css']
  // , providers: [HeroService]
})

export class MessageComponent implements OnInit, OnDestroy {
  title = 'Hello message'

  constructor() {
    console.log('message constructor')
  }

  ngOnInit() {
    console.log('message oninit')
  }

  ngOnDestroy() {
    console.log('message ondestroy')
  }

  log(e) {
    console.log(e)
  }
}
