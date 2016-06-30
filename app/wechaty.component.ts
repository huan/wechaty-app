import {
  Component
  , OnInit
  , OnDestroy
  , ChangeDetectionStrategy
  , EventEmitter
  , Input
  , Output
} from '@angular/core'

@Component({
  moduleId: module.id
  , selector: 'wechaty'
  , inputs: ['token']
  , templateUrl: 'wechaty.component.html'
  , styleUrls: ['wechaty.component.css']
  // , encapsulation: ViewEncapsulation.None
  , changeDetection: ChangeDetectionStrategy.OnPush
})

export class WechatyComponent implements OnInit, OnDestroy {
  @Output() message:    EventEmitter<string>
  @Output() scan:       EventEmitter<string>
  @Output() login:      EventEmitter<string>
  @Output() logout:     EventEmitter<string>
  @Output() error:      EventEmitter<string>
  @Output() heartbeat:  EventEmitter<string>

  @Input() token: string

  private userId: string
  private userName: string

  private timer: NodeJS.Timer // https://github.com/Microsoft/TypeScript/issues/842

  constructor() {
    console.log('constructor')
  }

  ngOnInit() {
    console.log('on init')
    this.timer = setTimeout(_ => {
      this.message.emit('hahaha')
    }, 1000)
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
