import {
  Component
  , OnInit
  , OnDestroy
  , ChangeDetectionStrategy
  , EventEmitter
  , Input
  , Output
} from '@angular/core'
import { Observable, Subject } from 'rxjs/Rx'

import { MessageComponent } from './message.component'
import { IoService } from './io.service'

@Component({
  moduleId: module.id
  , selector: 'wechaty'
  // , inputs: ['token']
  , templateUrl: 'wechaty.component.html'
  , directives: [
    MessageComponent
  ]
  // , providers: [IoService]
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

  private timer: Observable<any>
  private subscription: any
  private ender: any//Subject<any>

  constructor(
    // private ioService: IoService
  ) {
    console.log('wechaty constructor')
  }

  ngOnInit() {
    console.log('wechaty oninit')

    // this.ioService.setToken(this.token)
    this.ender = new Subject()

    this.startTimer()
  }

  startTimer() {
    this.timer = Observable.interval(1000)
        .takeUntil(this.ender)

    this.subscription = this.timer.subscribe(t => {
      this.counter = t
      // const dong = this.ioService.ding(this.counter)
      const dong = 'faint, no io service #' + t
      this.message.emit('#' + this.token + ':' + dong)
      console.log(dong)
    })

  }

  endTimer() {
  }

  ngOnDestroy() {
    this.endTimer()

    if (this.ender) {
      console.log(this.ender)
      this.ender.next('emit end')
    }

    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }

    if (this.timer) {
      // console.log(this.timer)
      // XXX how to cancel?
      // this.timer.dispose()
      this.timer = null
    }

    console.log('wechaty ondestroy')
  }
}
