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
import {
  Subscription
} from 'rxjs'

import { Brolog } from 'brolog'

import { WechatyComponent, ScanInfo, UserInfo } from '../wechaty.component/index'

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

  routeSub: Subscription

  messages: string[] = []

  scan: ScanInfo
  user: UserInfo
  
  hbCounter = 0

  constructor(
    private route: ActivatedRoute
    , private log: Brolog
  ) {
    log.verbose('Bot', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('Bot', 'ngOnInit()')
    this.routeSub = this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.token = 'zixia'
  }

  ngOnDestroy() {
    this.log.verbose('Bot', 'ngOnDestroy()')
    this.routeSub.unsubscribe()
  }

  onMessage(e) {
    this.log.verbose('Bot', 'onMessage(%s)', e)
    this.messages.push(e)
  }
  onHeartbeat(e) {
    this.log.silly('Bot', 'onHeartbeat(%s)', e)
    this.hbCounter++
    // this.messages.push(e)
  }
  onScan(scan: ScanInfo) {
    this.log.verbose('Bot', 'onScan(%d: %s)', scan.code, scan.url)
    this.scan = scan
  }
  onLogin(user: UserInfo) {
    this.log.verbose('Bot', 'onLogin(%s)', user.name)
    this.user = user
    this.scan = null
  }
  onLogout(e: UserInfo) {
    this.log.verbose('Bot', 'onLogout(%s)', e.name)
    this.user = null
  }

  reset(wechaty: WechatyComponent) {
    this.log.verbose('Bot', 'reset()')
    this.scan = this.user = null
    wechaty.reset('by web bot component')
  }
  shutdown(wechaty: WechatyComponent) {
    this.log.verbose('Bot', 'shutdown()')
    this.scan = this.user = null
    wechaty.shutdown('by web bot component')    
  }
}

export const BotRoutes: RouterConfig = [
  {
    path: 'bot/:id'
    , component: BotComponent
  }
]
