import {
  Injectable
  // OnInit & OnDestroy not work for @Injectable. http://stackoverflow.com/a/36189206/1123955
} from '@angular/core'
import {
  Observable
  , Subscriber
  , Subject
} from 'rxjs/Rx'

export class IoEvent {
  name: string
  payload: any
}

@Injectable()
export class IoService {
  private ENDPOINT = 'ws://jp.aka.cn:8080/websocket/token/'
  // private ENDPOINT = 'wss://api.wechaty.io/websocket/token/'
  private wsProtocol = 'web|0.0.1'
  private token: string

  private websocket: WebSocket
  private subscriber: Subscriber<IoEvent>
  private ioSubject: Subject<IoEvent>
  private sendBuffer: string[]

  constructor(token) {
    console.log('IoService.constructor()')
    this.token = token
    this.sendBuffer = []

    this.init()
  }

  init() {
    console.log('IoService.init()')

    this.initIoSubject()
    .then(_ => {
      this.initWebsocket()
    })

    return this
  }

  destroy() {
    console.log('IoServer.destroy()')
    this.ioSubject.unsubscribe()
  }

  io() {
    return this.ioSubject
  }

  endPoint(): string {
    return this.ENDPOINT + this.token
  }

  alive() {
    return this.websocket && (this.websocket.readyState === WebSocket.OPEN)
  }

  ding(payload) {
    console.log('IoService.ding(' + payload + ')')

    const e: IoEvent = {
      name: 'ding'
      , payload
    }
    this.io().next(e)
  }

  wsClose() {
    console.log('IoServer.wsClose()')

    this.websocket.close()
    this.websocket = null
  }

  wsSend(e: IoEvent) {
    console.log('IoService.wsSend(' + e.name + ')')

    const message = JSON.stringify(e)

    if (this.alive()) {
      // 1. check buffer for send old ones
      while (this.sendBuffer.length) {
        console.log('buffer processing: length: ' + this.sendBuffer.length)

        let m = this.sendBuffer.shift()
        this.websocket.send(m)
      }
      // 2. send this one
      this.websocket.send(message)

    } else { // 3. buffer this message for future retry
      this.sendBuffer.push(message)
      console.log('wsSend() without WebSocket.OPEN, buf len: %d', this.sendBuffer.length)
    }
  }

  initIoSubject() {
    console.log('IoServer.initIoSubject()')

    return new Promise(resolve => {
      const observable = Observable.create(subscriber => {
        console.log('Observable.create()')
        this.subscriber = subscriber

        ////////////////////////
        resolve()
        ////////////////////////

        return this.wsClose.bind(this)
      }).share()

      const obs = {
        complete: this.wsClose.bind(this)
        , next: this.wsSend.bind(this)
      }

      this.ioSubject = Subject.create(obs, observable)
    })
  }

  initWebsocket() {
    console.log('IoServer.initWebsocket()')

    if (this.websocket) {
      console.log('there already has a websocket. return for do nothing')
      return
    }

    this.websocket = new WebSocket(this.endPoint(), this.wsProtocol)

    this.websocket.onerror = onError.bind(this)
    this.websocket.onopen  = onOpen.bind(this)
    this.websocket.onclose = onClose.bind(this)

    // Handle the payload
    this.websocket.onmessage = onMessage.bind(this.subscriber)
  }

}

function onOpen(e) {
  console.log('IoService.onOpen()')
}

function onClose(e) {
  console.log('IoService.onClose(' + e + ')')
  console.log(e)

  this.websocket = null
  setTimeout(_ => {
    this.initWebsocket()
  }, 1000)

  if (!e.wasClean) {
    // console.warn('IoService.onClose: e.wasClean FALSE')
  }
}

function onError(e) {
  console.log('IoService.onError(' + e + ')')
  console.warn(e)

  this.websocket = null
  // log.verbose('IoService', 'xixi %s', 'haha')
  // log.level = ''
  // npmlog
  // conlog
}

/**
 *
 * this: Subscriber
 *
 */
function onMessage(message)
{
  console.log('IoService.onMessage()')

  let ioEvent: IoEvent = {
    name: 'raw'
    , payload: message
  } // this is default io event for unknown format message

  try {
    ioEvent = JSON.parse(message)
  } catch (e) {
    console.log('IoService.onMessage parse message fail.')
  }

  this.next(ioEvent)
}
