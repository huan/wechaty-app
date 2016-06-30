import { Component, OnInit } from '@angular/core'
import { WechatyComponent } from './wechaty.component'
import { ROUTER_DIRECTIVES } from '@angular/router'

@Component({
  selector: 'wechaty-app'
  , template: `<h1>{{ title }}</h1>
  <nav>
    <a [routerLink]="['/wechaty']" routerLinkActive="active">Dashboard</a>
    <a [routerLink]="['/bot-list/1']" routerLinkActive="active">My Bots</a>
  </nav>
  <router-outlet></router-outlet>
  `
  // , styleUrls: ['app/app.component.css']
  // , providers: [HeroService]
  , directives: [ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit {
  title = 'Hello Wechaty'

  constructor() {

  }

  ngOnInit() {

  }
}