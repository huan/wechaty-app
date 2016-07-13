import {
  Component
  , OnInit
  , OnDestroy
 } from '@angular/core'
import {
  RouterConfig
  , ActivatedRoute
} from '@angular/router'

import { WechatyComponent } from '../wechaty.component/index'

@Component({
  moduleId: module.id
  , selector: 'wechaty bot'
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
  ) {
    console.log('bot constuctor')
  }

  ngOnInit() {
    console.log('bot on init')
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']
      // this.heroService.getHero(id)
      //     .then(hero => this.hero = hero)
    })

    this.token = 'zixia'
  }

  ngOnDestroy() {
    console.log('bot on destroy')
    this.sub.unsubscribe()
  }

  log(e) {
    console.log('BotComponent.log()')
    console.log(e)
  }
}


export const BotRoutes: RouterConfig = [
  {
    path: 'bot/:id',
    component: BotComponent
  }
];
