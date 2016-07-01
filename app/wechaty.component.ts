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

@Component({
  moduleId: module.id
  , selector: 'wechaty'
  , inputs: ['token']
  , templateUrl: 'wechaty.component.html'
  , directives: [
    MessageComponent
  ]
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

  private timer: NodeJS.Timer // https://github.com/Microsoft/TypeScript/issues/842

  constructor() {
    console.log('wechaty constructor')
  }

  ngOnInit() {
    console.log('wechaty oninit')

    this.startTimer()
  }

  startTimer() {
    this.timer = setTimeout(_ => {
      this.message.emit('#' + this.token + ':' + this.counter++)
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
