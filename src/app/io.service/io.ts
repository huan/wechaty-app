import {
  Injectable
  // no need use OnInit & OnDestroy, because we create this service manually.
  // there will be no angular framework to call those two ngOnXXX functions.
  // , OnInit
  // , OnDestroy
} from '@angular/core'
import {
  Observable
  , Subscriber
  , Subject
} from 'rxjs/Rx'

export class IoEvent {
  name: string
  data: any
}

@Injectable()
export class IoService {
  private ENDPOINT = 'ws://jp.aka.cn:8080/websocket/token/'
  // 'wss://api.wechaty.io/websocket/token/'
  private wsProtocol = 'web|0.0.1'
  private wsUrl: string

  private token: string

  private websocket: WebSocket
  // private wsIniting = false
  private subscriber: Subscriber<IoEvent>
  private ioSubject: Subject<IoEvent>

  private sendBuffer: string[]

  constructor(token) {
    console.log('IoService.constructor()')
    this.token = token
    this.wsUrl = this.endPoint(this.token)
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

  endPoint(token): string {
    return this.ENDPOINT + this.token
  }

  alive() {
    return this.websocket && (this.websocket.readyState === WebSocket.OPEN)
  }

  ding(data) {
    console.log('IoService.ding(' + data + ')')

    const e: IoEvent = {
      name: 'ding'
      , data
    }
    this.ioSubject.next(e)
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
    } else {
      console.log('wsSend() be called without WebSocket.OPEN')
      this.sendBuffer.push(message)
      console.log('buffered. length now : ' + this.sendBuffer.length)
      // console.log('call initWebsocket ...')
      // this.initWebsocket()
    }
  }

  initIoSubject() {
    console.log('IoServer.initIoSubject()')

    return new Promise((resolve, reject) => {
      const observable = Observable.create(subscriber => {
        console.log('Observable.create()')
        // console.log(subscriber)
        this.subscriber = subscriber

        ////////////////////
        resolve()
        ////////////////////

        return this.wsClose.bind(this)
      })

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
      console.log('there do has a websocket. return for do nothing')
      return
    }

    // if (this.wsIniting) {
    //   console.log('wsIniting is true. return for do nothing')
    //   return
    // }
    // this.wsIniting = true

    this.websocket = new WebSocket(this.wsUrl, this.wsProtocol)

    this.websocket.onerror = onError.bind(this)
    this.websocket.onopen  = onOpen.bind(this)
    this.websocket.onclose = onClose.bind(this)

    // Handle the data
    this.websocket.onmessage = onMessage.bind(this.subscriber)
  }

}

function onOpen(e)
{
  console.log('IoService.onOpen()')

  this.wsIniting = false
  // this.send()
}

function onClose(e)
{
  console.log('IoService.onClose(' + e + ')')
  console.log(e)

  this.websocket = null
  // this.wsIniting = false
  setTimeout(_ => {
    this.initWebsocket()
  }, 1000)

  // TODO: reconnect
  // this.complete(e)

  if (!e.wasClean) {
    // console.warn('IoService.onClose: e.wasClean FALSE')
    // XXX don't call error() unless we can't recover
    // this.error(e)
  }
}

function onError(e)
{
  console.log('IoService.onError(' + e + ')')
  console.warn(e)

  // this.websocket = null
  // this.wsIniting = false
  // this.initWebsocket()

  // log.verbose('IoService', 'xixi %s', 'haha')
  // log.level = ''
  // npmlog
  // conlog

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
