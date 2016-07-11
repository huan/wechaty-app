import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {
  private token: string

  constructor() {
    console.log('auth service constructor()')
  }

  auth(username: string, password: string): boolean {
    if (password) {
      if (username === 'zixia') {
        return true
      }
    } else {
      const token = username
      if (token === 'wechaty') {
        return true
      }
    }
    return false
  }

  setToken(token:string): string {
    return this.token = token
  }

  getToken() {
    return this.token
  }

  logout() {
    console.log('authService.logout()')
  }
}
