import {
  Injectable
  // no need use OnInit & OnDestroy, because we create this service manually.
  // there will be no angular framework to call those two ngOnXXX functions.
  // , OnInit
  // , OnDestroy
} from '@angular/core'
import {
  Observable
  , Subject
} from 'rxjs/Rx'

export class IoEvent {
  name: string
  data: any
}

@Injectable()
export class IoService {
  private PROTOCOL = 'web|0.0.1'

  private token: string

  private websocket: WebSocket
  private ioSubject: Subject<IoEvent>

  private sendBuffer: IoEvent[]

  constructor(token) {
    console.log('IoService constructor')
    this.token = token

    this.init()
  }

  init() {
    console.log('IoService.init()')

    this.sendBuffer = []

    const wsUrl = this.endPoint(this.token)
    this.ioSubject = this.connect(wsUrl, this.PROTOCOL)

    return this
  }

  destroy() {
    console.log('IoServer ngOnDestroy()')

    // this.ioSub.depose()
  }

  io() {
    return this.ioSubject
  }

  endPoint(token): string {
    return 'wss://api.wechaty.io/websocket/token/' + this.token
  }

  alive() {
    return this.websocket && (this.websocket.readyState === WebSocket.OPEN)
  }

  connect(url, protocol): Subject<IoEvent> {
    // Handle the data
    const ws = this.websocket = new WebSocket(url, protocol)

    const observable = Observable.create(obs => {
      // Handle messages
      ws.onopen    = onOpen.bind(this)
      ws.onmessage = onMessage.bind(obs)
      ws.onerror   = onError.bind(obs)
      ws.onclose   = onClose.bind(obs)

      // Return way to unsubscribe
      return ws.close.bind(ws)
    })

    const observer = {
      next: (e: IoEvent) => {
        console.log('IoEvent observer.next()')

        if (ws.readyState === WebSocket.OPEN) {
          // 1. check buffer for send old ones
          while (this.sendBuffer.length) {
            let event = this.sendBuffer.unshift()
            ws.send(JSON.stringify(event))
          }
          // 2. send this one
          ws.send(JSON.stringify(e))
        } else {
          console.log('observer.next() be called without WebSocket.OPEN')
          this.sendBuffer.push(e)
        }
      }
    }
    return Subject.create(observer, observable)
  }
}

function onOpen(e)
{
  console.log('IoService.onOpen()')

  // this.send()
}

function onClose(e)
{
  console.log('IoService.onClose()')

  // TODO: reconnect
  // this.complete(e)

  if (!e.wasClean) {
    console.warn('IoService.onClose: e.wasClean FALSE')
    // XXX don't call error() unless we can't recover
    // this.error(e)
  }
}

function onError(e)
{
  console.log('IoService.onError()')
  console.log(e)

  // TODO: recover from error automaticaly
  // and only raise error when we cant recover.
  // this.error(e)
}

function onMessage(e)
{
  console.log('IoService.onMessage()')

  let ioEvent: IoEvent = {
    name: 'text'
    , data: e.data
  }

  try {
    ioEvent = JSON.parse(e.data)
  } catch (e) {
    console.log('IoService.onMessage parse message fail.')
  }

  this.next(ioEvent)
}
