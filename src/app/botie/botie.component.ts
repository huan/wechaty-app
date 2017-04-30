import {
  Component
  , OnInit
  , OnDestroy
 } from '@angular/core'

import {
  ActivatedRoute
} from '@angular/router'

import {
  Subscription
} from 'rxjs/Subscription'

import { Brolog } from 'brolog'

import {
  WechatyComponent
  , ScanInfo
  , UserInfo
} from '../wechaty/wechaty.component'

import { AuthService } from '../auth.service'
import { AuthGuardService } from '../auth-guard.service'

@Component({
  // moduleId: module.id
  selector: 'app-botie',
  templateUrl: './botie.component.html',
  styleUrls: ['./botie.component.css']
})

export class BotieComponent implements OnInit, OnDestroy {
  id: number
  token: string
  messages: string[] = []
  scan: ScanInfo
  user: UserInfo
  hbCounter = 0

  routeSub: Subscription
  authSub: Subscription

  constructor(
    private route: ActivatedRoute
    , private log: Brolog
    , private authService: AuthService
  ) {
    log.verbose('Botie', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('Botie', 'ngOnInit()')
    this.routeSub = this.route.params.subscribe(
      params => {
        this.id = +params['id']
      },
      // http://stackoverflow.com/a/43471130/1123955
      error => {
        this.log.error('Botie', 'ngOnInit() Route.params.subscript() error:%s'
                              , error
                      )
      }
    )

    // TBD: use right bot token
    this.token = this.authService.user.name
  }

  ngOnDestroy() {
    this.log.verbose('Botie', 'ngOnDestroy()')
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

  onMessage(e) {
    this.log.verbose('Botie', 'onMessage(%s)', e)
    this.messages.push(e)
  }
  onHeartbeat(e) {
    this.log.silly('Botie', 'onHeartbeat(%s)', e)
    this.hbCounter++
    // this.messages.push(e)
  }
  onScan(scan: ScanInfo) {
    this.log.verbose('Botie', 'onScan(%d: %s)', scan.code, scan.url)
    this.scan = scan
  }
  onLogin(user: UserInfo) {
    this.log.verbose('Botie', 'onLogin(%s)', user.name)
    this.user = user
    this.scan = null
  }
  onLogout(e: UserInfo) {
    this.log.verbose('Botie', 'onLogout(%s)', e.name)
    this.user = null
  }

  reset(wechaty: WechatyComponent) {
    this.log.verbose('Botie', 'reset()')
    this.scan = this.user = null
    wechaty.reset('by web bot component')
  }
  shutdown(wechaty: WechatyComponent) {
    this.log.verbose('Botie', 'shutdown()')
    this.scan = this.user = null
    wechaty.shutdown('by web bot component')
  }
}
