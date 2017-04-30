import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  // ioEndPoint: 'ws://jp.aka.cn:8080/websocket/token/'
  public ioEndPoint = 'wss://api.chatie.io/websocket/token/'
  // ioEndPoint: 'ws://hk.zixia.net:8080/websocket/token/'

  constructor() { }

}

export interface User {
  name: string
  pass: string
  token: string
}
