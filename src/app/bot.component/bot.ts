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

import { WechatyComponent } from '../wechaty.component/index'

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
    this.log.verbose('Bot', 'onMessage()')
    this.log.verbose('Bot', e)

    this.messages.push(e)
  }

  onHeartbeat(e) {
    this.log.verbose('Bot', 'onHeartbeat(%s)', e)
    this.messages.push(e)
  }
  onScan(e) {
    this.messages.push(e)
  }
  onLogin(e) {
    this.messages.push(e)
  }
  onLogout(e) {
    this.messages.push(e)
  }

}

export const BotRoutes: RouterConfig = [
  {
    path: 'bot/:id'
    , component: BotComponent
  }
]
