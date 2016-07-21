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

  constructor(
    private route: ActivatedRoute
    , @Inject(Brolog) private log: Brolog
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

    this.token = 'zixia'
  }

  ngOnDestroy() {
    this.log.verbose('Bot', 'ngOnDestroy()')
    this.sub.unsubscribe()
  }

  onMessage(e) {
    this.log.verbose('Bot', 'onMessage(%s)', e)
  }
}


export const BotRoutes: RouterConfig = [
  {
    path: 'bot/:id',
    component: BotComponent
  }
];
