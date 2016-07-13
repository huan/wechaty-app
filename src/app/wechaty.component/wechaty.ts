import {
  Component
  , OnInit
  , OnDestroy
  , EventEmitter
  , Input
  , Output
  , NgZone
} from '@angular/core'
import { Observable, Subject } from 'rxjs/Rx'

import { MessageComponent } from '../message.component/index'
import { IoService, IoEvent } from '../io.service/index'

@Component({
  moduleId: module.id
  , selector: 'wechaty'
  , inputs: ['token']
  , templateUrl: 'wechaty.html'
  , directives: [
    MessageComponent
  ]
  // , providers: [IoService]
  , styleUrls: ['wechaty.css']
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

  private timer: Observable<any>
  private ioSubscription: any
  private ender: any//Subject<any>

  private ioService: IoService

  counter = 0

  constructor(
    // private ioService: IoService
    private ngZone: NgZone
  ) {
    console.log('Wechaty.constructor() with token: ' + this.token)
  }

  ngOnInit() {
    console.log('Wechaty.ngOninit()')

    const ioService = this.ioService = new IoService(this.token)

    this.ioSubscription = ioService.io()
                          .subscribe(e => this.onIo(e))

    this.ender = new Subject()

    this.startTimer()
  }

  ngOnDestroy() {
    this.endTimer()

    if (this.ender) {
      console.log(this.ender)
      this.ender.next('emit end')
    }

    if (this.ioSubscription) {
      this.ioSubscription.unsubscribe()
      this.ioSubscription = null
    }

    if (this.timer) {
      // console.log(this.timer)
      // XXX how to cancel?
      // this.timer.dispose()
      this.timer = null
    }

    console.log('wechaty ondestroy')
  }

  onIo(e) {
    console.log('Wechaty.onIo()')
    console.log(e)
  }

  startTimer() {
    // https://github.com/angular/protractor/issues/3349#issuecomment-232253059
    // https://github.com/juliemr/ngconf-2016-zones/blob/master/src/app/main.ts#L38
    this.ngZone.runOutsideAngular(() => {
      this.timer = Observable.interval(1000)
          .takeUntil(this.ender)
    })

    this.timer.subscribe(t => {
      this.counter = t
      // const dong = this.ioService.ding(this.counter)
      const dong = 'faint, no io service #' + t
      this.message.emit('#' + this.token + ':' + dong)

      const ioEvent: IoEvent = {
        name: 'test'
        , data: dong
      }
      // this.ioService.io().next(ioEvent)
      console.log(dong)
    })

  }

  endTimer() {
    this.ender.next()
  }

}
