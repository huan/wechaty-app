import {
  Component
  , OnInit
  , OnDestroy
  , EventEmitter
  , Input
  , Output
  , NgZone
} from '@angular/core'
import {
  Observable
  , Subject
  , Subscription
} from 'rxjs/Rx'

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

  private timer: Observable<any>
  private timerSub: Subscription
  private ioSubscription: any
  private ender: any//Subject<any>

  private ioService: IoService

  counter = 0

  constructor(
    private ngZone: NgZone
  ) {
    console.log('Wechaty.constructor() with token: ' + this.token)
  }

  ngOnInit() {
    console.log('Wechaty.ngOninit()')

    const ioService = this.ioService = new IoService(this.token)

    this.ioSubscription = ioService.io()
                          .subscribe(this.onIo.bind(this))

    this.startTimer()
  }

  ngOnDestroy() {
    this.endTimer()

    if (this.ioSubscription) {
      this.ioSubscription.unsubscribe()
      this.ioSubscription = null
    }

    console.log('wechaty ondestroy')
  }

  onIo(e: IoEvent) {
    console.log('Wechaty.onIo(%s)', e.name)
    // console.log(e.payload)

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
        console.warn('onIo() unknown event name: %s[%s]', e.name, e.payload)
        break
    }
  }

  startTimer() {
    this.ender = new Subject()

    // https://github.com/angular/protractor/issues/3349#issuecomment-232253059
    // https://github.com/juliemr/ngconf-2016-zones/blob/master/src/app/main.ts#L38
    this.ngZone.runOutsideAngular(() => {
      this.timer = Observable.interval(3000)
          .do(i => { console.log('do: %d', i) })
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
    this.timerSub.unsubscribe()
    this.timer = null

    this.ender.next()
    this.ender = null
  }

}
