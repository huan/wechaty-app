import {
  Observable,
  Observer,
  Subscriber,
  Subject,
}                       from 'rxjs/Rx'
import                  'rxjs/add/operator/map'

import { Brolog }       from 'brolog'
// import * as ws      from 'ws'

import { StateSwitch }  from 'state-switch'

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 */
export class WsClient {
  private _readyState:  Subject<number>
  public get readyState() {
    return this._readyState
                .asObservable()
                .share() // ?
  }

  public message: Observable<MessageEvent>
  // public close:   Observable<CloseEvent>
  // public error:   Observable<Event>
  // public open:    Observable<Event>

  // public data:    Observable<String | ArrayBuffer | Blob>
  public ender:   Subject<boolean>

  // private ws:   WebSocket
  private log:  Brolog

  private state = new StateSwitch<'open', 'close'>('WsClient', 'close', this.log)

  constructor(
    private endpoint:      string,
    private authorization?: string,
  ) {
    this.log = Brolog.instance()
    this.log.verbose('WsClient', 'constructor(%s, %s)', endpoint, authorization)
  }

  // public connect(
  // ) {
  //   this.log.verbose('WsClient', 'connect()')
  //   this.ender.next(false)
  // }

  public disconnect() {
    this.log.verbose('WsClient', 'disconnect()')
    this.ender.next(true)
  }

  connect() {
    this.message = Observable.create((observer: Observer<MessageEvent>) => {
      if (!WebSocket) {
        throw new TypeError('your runtime does not support WebSocket.')
      }
      const websocket = new WebSocket(this.endpoint)

      websocket.onmessage = observer.next.bind(observer)

      const updateReadyState = () => {
        this._readyState.next(websocket.readyState)
      }

      websocket.onclose   = (closeEvent: CloseEvent) => {
        updateReadyState()
        observer.complete()
      }
      websocket.onerror   = (event: Event) => {
        updateReadyState()
        observer.error(event)
      }
      websocket.onopen    = (event: Event) => {
        updateReadyState()
      }

      return websocket.close.bind(websocket)

    })
    .takeUntil(this.ender)
    .share()

    // const messageToData = (messageEvent: MessageEvent) => {
    //   this.log.silly('WsClient', 'init() fromEvent() %s', JSON.stringify(messageEvent))
    //   return messageEvent.data
    // }

    // this.data = this.message.map(messageToData)
    //                         .share()

  }

  send(data: String | ArrayBuffer | Blob) {
    // return this.ws.send(data)
  }
}

export default WsClient
