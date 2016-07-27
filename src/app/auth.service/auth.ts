import {
  Injectable
  , Inject
} from '@angular/core'

import { Observable } from 'rxjs/Observable'

import { Brolog } from 'brolog'

import { User } from '../shared/user'

@Injectable()
export class AuthService {
  loggedIn = false
  redirectUrl: string

  private token: string
  private user: User

  constructor(
    private log: Brolog
  ) {
    this.log.verbose('AuthService', 'constructor()')

    this.token = localStorage.getItem('token')
  }

  login(username: string, password: string): Observable<string> {
    this.log.verbose('AuthService', 'auth(%s/%s)', username, password)

    /*
     * If we had a login api, we would have done something like this

    return this.http.post('/auth/login', JSON.stringify({
        username: username,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((res : any) => {
        let data = res.json();
        this.token = data.token;
        localStorage.setItem('token', this.token);
      });

      for the purpose of this cookbook, we will juste simulate that
    */

    let user: User

    if (username && password) {
      user = {
        name: username
        , pass: password
        , token: username
      }
    }

    if (user) {
      this.loggedIn = true
      this.user = user
      this.token = username

      localStorage.setItem('token', this.token)
      return Observable.of(this.token).delay(1000)
    }
    return Observable.throw('authentication failure')
  }

  // setToken(token:string): string {
  //   this.log.verbose('AuthService', 'setToken(%s)', token)
  //   return this.token = token
  // }

  // getToken() {
  //   return this.token
  // }

  logout() {
    this.log.verbose('AuthService', 'logout()')

    /*
     * If we had a login api, we would have done something like this

    return this.http.get(this.config.serverUrl + '/auth/logout', {
      headers: new Headers({
        'x-security-token': this.token
      })
    })
    .map((res : any) => {
      this.token = undefined;
      localStorage.removeItem('token');
    });
     */

    this.loggedIn = false
    this.user   = null
    this.token  = null
    localStorage.removeItem('token')
  }
}
