import { Injectable } from '@angular/core'

@Injectable()
export class IoService {
  private token: string

  constructor() {

  }

  setToken(token:string): string {
    return this.token = token
  }

  ding(msg) {
    return 'dong(' + msg + ') by token[' + this.token + ']'
  }
}