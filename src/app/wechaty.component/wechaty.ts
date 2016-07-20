import {
  Component
  , OnInit
  , OnDestroy
  , EventEmitter
  , Input
  , Output
  , NgZone
  , Injector
} from '@angular/core'
import {
  Observable
  , Subject
  , Subscription
} from 'rxjs/Rx'

import { Brolog } from 'brolog'

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

  private timer: Observable<any>
  private timerSub: Subscription
  private ioSubscription: any
  private ender: any//Subject<any>

  private ioService: IoService

  counter = 0

  constructor(
    private ngZone: NgZone
    , private log: Brolog
    , private injector: Injector
  ) {
    this.log.verbose('Wechaty', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('Wechaty', 'ngOninit() with token: ' + this.token)

    const ioService = this.ioService = new IoService(
      this.token
      , this.injector
    )

    this.ioSubscription = ioService.io()
                          .subscribe(this.onIo.bind(this))

    // this.startTimer()
  }

  ngOnDestroy() {
    this.log.verbose('Wechaty', 'ngOnDestroy()')

    this.endTimer()

    if (this.ioSubscription) {
      this.ioSubscription.unsubscribe()
      this.ioSubscription = null
    }
  }

  onIo(e: IoEvent) {
    this.log.verbose('Wechaty', 'onIo() %s:%s', e.name, e.payload)

    switch(e.name) {
      case 'heartbeat':
        this.heartbeat.emit(e.payload)
        break
      case 'scan':
        this.scan.emit(e.payload)
        break
      case 'message':
        this.message.emit(e.payload)
        break
      case 'login':
        this.login.emit(e.payload)
        break
      case 'logout':
        this.logout.emit(e.payload)
        break
      case 'error':
        this.error.emit(e.payload)
        break

      case 'dong':
      case 'raw':
        this.heartbeat.emit(e.name + ':' + e.payload)
        break

      default:
        this.log.warn('Wechaty', 'onIo() unknown event name: %s[%s]', e.name, e.payload)
        break
    }
  }

  startTimer() {
    this.log.verbose('Wechaty', 'startTimer()')
    this.ender = new Subject()

    // https://github.com/angular/protractor/issues/3349#issuecomment-232253059
    // https://github.com/juliemr/ngconf-2016-zones/blob/master/src/app/main.ts#L38
    this.ngZone.runOutsideAngular(() => {
      this.timer = Observable.interval(3000)
          .do(i => { this.log.verbose('do', ' %d', i) })
          .takeUntil(this.ender)
          // .publish()
          .share()
    })

    this.timerSub = this.timer.subscribe(t => {
      this.counter = t

      this.ioService.ding(this.counter)
      // this.message.emit('#' + this.token + ':' + dong)
    })

  }

  endTimer() {
    this.log.verbose('Wechaty', 'endTimer()')

    this.timerSub.unsubscribe()
    this.timer = null

    this.ender.next()
    this.ender = null
  }

}
