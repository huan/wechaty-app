import {
  Injectable
  , Inject
} from '@angular/core'
import { User } from '../shared/user'

import { Brolog } from 'brolog'

@Injectable()
export class AuthService {
  private authStatus = false

  private token: string
  private user: User

  constructor(
    @Inject(Brolog) private log: Brolog
  ) {
    log.verbose('AuthService', 'constructor()')
  }

  authed() { return this.authStatus }

  auth(username: string, password: string): boolean {
    this.authStatus = false

    if (password) {
      if (username === 'zixia') {
        this.authStatus = true
      }
    } else {
      const token = username
      if (token === 'wechaty') {
        this.authStatus = true
      }
    }
    return this.authStatus
  }

  setToken(token:string): string {
    return this.token = token
  }

  getToken() {
    return this.token
  }

  logout() {
    this.authStatus = false
    this.token = ''
    this.user = null
    console.log('authService.logout()')
  }
}
