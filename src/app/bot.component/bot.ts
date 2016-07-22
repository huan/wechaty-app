import {
  Component
  , OnInit
  , OnDestroy
  , Inject
 } from '@angular/core'
import {
  RouterConfig
  , ActivatedRoute
} from '@angular/router'

import { Brolog } from 'brolog'

import { WechatyComponent, ScanEvent } from '../wechaty.component/index'

@Component({
  moduleId: module.id
  , selector: 'bot'
  , templateUrl: 'bot.html'
  , directives: [WechatyComponent]
  , styleUrls: ['bot.css']
})

export class BotComponent implements OnInit, OnDestroy {
  id: number
  token: string

  sub: any

  messages = ['1st message']
  logedIn = false
  scan: ScanEvent
  counter = 0

  constructor(
    private route: ActivatedRoute
    , private log: Brolog
  ) {
    log.verbose('Bot', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('Bot', 'ngOnInit()')
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']
      // this.heroService.getHero(id)
      //     .then(hero => this.hero = hero)
    })

    this.messages.push('init')
    this.token = 'zixia'
  }

  ngOnDestroy() {
    this.log.verbose('Bot', 'ngOnDestroy()')
    this.sub.unsubscribe()
  }

  onMessage(e) {
    this.log.verbose('Bot', 'onMessage(%s)', e)
    this.messages.push(e)
  }
  onHeartbeat(e) {
    this.log.verbose('Bot', 'onHeartbeat(%s)', e)
    this.counter++
    this.messages.push(e)
  }
  onScan(e: ScanEvent) {
    this.log.verbose('Bot', 'onScan(%d: %s)', e.code, e.url)
    this.scan = e
  }
  onLogin(e) {
    this.log.verbose('Bot', 'onLogin(%s)', e)
    this.logedIn = true
  }
  onLogout(e) {
    this.log.verbose('Bot', 'onLogout(%s)', e)
    this.logedIn = false
  }

}

export const BotRoutes: RouterConfig = [
  {
    path: 'bot/:id'
    , component: BotComponent
  }
]
