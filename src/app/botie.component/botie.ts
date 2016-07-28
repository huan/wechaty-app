import { 
  Component
  , OnInit
  , OnDestroy 
} from '@angular/core'
import { RouterConfig } from '@angular/router'

import { Brolog } from 'brolog'

@Component({
  moduleId: module.id
  , selector: 'botie'
  , templateUrl: 'botie.html'
  , directives: [
  ]
})

export class BotieComponent implements OnInit, OnDestroy {
  title = 'Hello Botie'

  constructor(
    private log: Brolog
  ) {
    log.verbose('BotieComponent', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('BotieComponent', 'ngOnInit()')
  }

  ngOnDestroy() {
    this.log.verbose('BotieComponent', 'ngOnDestroy()')
  }

}

export const BotieRoutes: RouterConfig = [
  {
    path: 'botie',
    component: BotieComponent
  }
]
