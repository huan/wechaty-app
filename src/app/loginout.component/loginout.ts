import {
  Component
  , OnInit
  , OnDestroy
} from '@angular/core'
import { Router, ActivatedRoute, RouterConfig } from '@angular/router'
import { Validators }   from '@angular/forms'

import { AuthService } from '../auth.service/index'

@Component({
  moduleId: module.id
  , selector: 'loginout'
  , templateUrl: 'loginout.html'
  , styleUrls: ['loginout.css']
})

export class LoginoutComponent implements OnInit, OnDestroy {
  title = 'Loginout Component Title'
  sub: any

  constructor(
    private authService: AuthService
    , private router: Router
    , private route: ActivatedRoute
  ) {
    console.log('loginout constructor')
  }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   console.log('loginout onInit params: ')
    //   console.log(params)
    // })
    // this.sub = this.route.url.subscribe(url => {
    //   console.log(url[0].path)
    // })
    console.log('loginout oninit')

    const link = ['/bot', '1']
    this.router.navigate(link)

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
    console.log('loginout ondestroy')
  }

  login({
    username
    , password
    , remember
  }) {

    let succ = this.authService.auth(username, password)

    console.log('login('
      + username
      + ', '
      + password
      + ') : '
      + succ
     )

    if (succ) {
      console.log('succ, redirect to bot/1')
      const link = ['/bot', '1']
      this.router.navigate(link)
    }

    return succ
  }

  logout() {
    const link = ['/']
    this.router.navigate(link)
  }
}

export const LoginoutRoutes: RouterConfig = [
  {
    path: 'login',
    component: LoginoutComponent
  }
]
