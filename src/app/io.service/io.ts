import {
  Injector
  , OpaqueToken
  // Injectable
  // OnInit & OnDestroy only work for @Component. http://stackoverflow.com/a/36189206/1123955
} from '@angular/core'
import {
  Observable
  , Subscriber
  , Subject
} from 'rxjs/Rx'

import { Brolog } from 'brolog'

import { config } from '../shared/config'

export interface IoEvent {
  name: string
  payload: any
}

export class IoService {
  // private ENDPOINT = 'ws://jp.aka.cn:8080/websocket/token/'
  // private ENDPOINT = 'wss://api.wechaty.io/websocket/token/'
  private wsProtocol = 'web|0.0.1'

  private websocket: WebSocket
  private subscriber: Subscriber<IoEvent>
  private ioSubject: Subject<IoEvent>
  private sendBuffer: string[]

  private log    = this.injector.get(Brolog)

  constructor(
    private token: string
    , private injector: Injector
   ) {
    this.log.verbose('IoService', 'constructor()')
    // console.log(injector)

    this.sendBuffer = []

    this.init()
  }

  init() {
    this.log.verbose('IoService', 'init()')

    this.initIoSubject()
    .then(_ => {
      this.initWebSocket()
    })

    return this
  }

  destroy() {
    this.log.verbose('IoService', 'destroy()')
    this.ioSubject.unsubscribe()
  }

  io() {
    return this.ioSubject
  }

  endPoint(): string {
    return config.ioEndPoint + this.token
  }

  alive() {
    return this.websocket && (this.websocket.readyState === WebSocket.OPEN)
  }

  ding(payload) {
    this.log.verbose('IoService', 'ding(%s)', payload)

    const e: IoEvent = {
      name: 'ding'
      , payload
    }
    this.io().next(e)
  }

  wsClose() {
    this.log.verbose('IoService', 'wsClose()')

    this.websocket.close()
    this.websocket = null
  }

  wsSend(e: IoEvent) {
    this.log.verbose('IoService', 'wsSend(' + e.name + ')')

    const message = JSON.stringify(e)

    if (this.alive()) {
      // 1. check buffer for send old ones
      while (this.sendBuffer.length) {
        this.log.verbose('IoService', 'wsSend() buffer processing: length: ' + this.sendBuffer.length)

        let m = this.sendBuffer.shift()
        this.websocket.send(m)
      }
      // 2. send this one
      this.websocket.send(message)

    } else { // 3. buffer this message for future retry
      this.sendBuffer.push(message)
      this.log.verbose('IoService', 'wsSend() without WebSocket.OPEN, buf len: %d', this.sendBuffer.length)
    }
  }

  initIoSubject() {
    this.log.verbose('IoService', 'initIoSubject()')

    return new Promise(resolve => {
      const observable = Observable.create(subscriber => {
        this.log.verbose('IoService', 'initIoSubject() Observable.create()')
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

  initWebSocket() {
    this.log.verbose('IoService', 'initWebSocket()')

    if (this.websocket) {
      this.log.verbose('IoService', 'initWebSocket() there already has a websocket. return for do nothing')
      return
    }

    this.websocket = new WebSocket(this.endPoint(), this.wsProtocol)

    this.websocket.onerror = onError.bind(this)
    this.websocket.onopen  = onOpen.bind(this)
    this.websocket.onclose = onClose.bind(this)

    // Handle the payload
    this.websocket.onmessage = onMessage.bind(this)
  }

}

function onOpen(e) {
  this.log.verbose('IoService', 'onOpen()')
}

function onClose(e) {
  this.log.verbose('IoService', 'onClose(' + e + ')')
  this.log.verbose('IoService', e)

  this.websocket = null
  setTimeout(_ => {
    this.initWebSocket()
  }, 1000)

  if (!e.wasClean) {
    // console.warn('IoService.onClose: e.wasClean FALSE')
  }
}

function onError(e) {
  this.log.verbose('IoService', 'onError(' + e + ')')
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
  this.log.verbose('IoService', 'onMessage()')

  const data = message.data // WebSocket data

  let ioEvent: IoEvent = {
    name: 'raw'
    , payload: data
  } // this is default io event for unknown format message

  try {
    const obj = JSON.parse(data)
    ioEvent.name = obj.name
    ioEvent.payload = obj.payload
  } catch (e) {
    this.log.verbose('IoService', 'onMessage parse message fail.')
  }

  this.subscriber.next(ioEvent)
}
