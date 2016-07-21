import { 
  Component
  , Inject
  , OnInit
  , OnDestroy 
} from '@angular/core'
import { RouterConfig } from '@angular/router'

import { Brolog } from 'brolog'

// import { WechatyComponent } from './wechaty.component'

@Component({
  moduleId: module.id
  , selector: 'message'
  , templateUrl: 'message.html'

  , directives: [
  ]
  // , styleUrls: ['app/app.component.css']
})

export class MessageComponent implements OnInit, OnDestroy {
  title = 'Hello message'

  constructor(
    @Inject(Brolog) private log: Brolog
  ) {
    log.verbose('MessageComponent', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('MessageComponent', 'ngOnInit()')
  }

  ngOnDestroy() {
    this.log.verbose('MessageComponent', 'ngOnDestroy()')
  }

}

export const MessageRoutes: RouterConfig = [
  {
    path: 'message',
    component: MessageComponent
  }
]
