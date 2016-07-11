import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterConfig } from '@angular/router'

// import { WechatyComponent } from './wechaty.component'

@Component({
  moduleId: module.id
  , selector: 'message'
  , templateUrl: 'message.html'

  , directives: [
    // WechatyComponent
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

export const MessageRoutes: RouterConfig = [
  {
    path: 'message',
    component: MessageComponent
  }
]
