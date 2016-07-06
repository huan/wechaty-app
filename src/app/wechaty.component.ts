import {
  Component
  , OnInit
  , OnDestroy
  , ChangeDetectionStrategy
  , EventEmitter
  , Input
  , Output
} from '@angular/core'

import { MessageComponent } from './message.component'
import { IoService } from './io.service'

@Component({
  moduleId: module.id
  , selector: 'wechaty'
  , inputs: ['token']
  , templateUrl: 'wechaty.component.html'
  , directives: [
    MessageComponent
  ]
  , providers: [IoService]
  // , styleUrls: ['wechaty.component.css']
  // , encapsulation: ViewEncapsulation.None
  , changeDetection: ChangeDetectionStrategy.OnPush
})

export class WechatyComponent implements OnInit, OnDestroy {
  @Output() message   = new EventEmitter()
  @Output() scan      = new EventEmitter()
  @Output() login     = new EventEmitter()
  @Output() logout    = new EventEmitter()
  @Output() error     = new EventEmitter()
  @Output() heartbeat = new EventEmitter()

  @Input() token: string = ''

  private userId: string
  private userName: string

  private counter = 0

  private timer: any // NodeJS.Timer // https://github.com/Microsoft/TypeScript/issues/842

  constructor(
    private ioService: IoService
  ) {
    console.log('wechaty constructor')
  }

  ngOnInit() {
    console.log('wechaty oninit')

    this.ioService.setToken(this.token)

    this.startTimer()
  }

  startTimer() {
    this.timer = setTimeout(_ => {
      this.counter++
      const dong = this.ioService.ding(this.counter)
      this.message.emit('#' + this.token + ':' + dong)
      this.startTimer()
    }, 1000)
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    console.log('wechaty ondestroy')
  }
}
