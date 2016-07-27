import {
  Component
  , OnInit
  , OnDestroy
} from '@angular/core'

import { 
  Router
  , ActivatedRoute
  , RouterConfig 
} from '@angular/router'

import {   
  NgForm
  , Validators 
} from '@angular/forms'

import { Brolog } from 'brolog'

import { AuthService } from '../auth.service/index'

@Component({
  moduleId: module.id
  , selector: 'login'
  , templateUrl: 'login.html'
  , styleUrls: ['login.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  title = 'Wechaty Login'
  // sub: any

  constructor(
    private authService: AuthService
    , private router: Router
    , private route: ActivatedRoute
    , private log: Brolog
  ) {
    log.verbose('LoginoutComponent', 'constructor()')
  }

  ngOnInit() {
    this.log.verbose('LoginoutComponent', 'ngOnInit()')
  }

  ngOnDestroy() {
    this.log.verbose('LoginoutComponent', 'ngDestroy()')
  }

  /**
   * NgForm Guide: http://blog.thoughtram.io/angular/2016/03/21/template-driven-forms-in-angular-2.html
   */
  login(form: NgForm): void {
    this.log.verbose('LoginoutComponent', 'login()')

    const {
      username
      , password
      , remember
    } = form.value

    this.authService.login(username, password)
        .subscribe(
          _ => {
            let link = ['/bot', '1']
            if (this.authService.redirectUrl) {
                link = [this.authService.redirectUrl]
            }
            this.router.navigate(link)
            this.log.verbose('LoginoutComponent', 'login() succ, redirecting to %s', link[0])
          }
          , e => {
            this.log.verbose('LoginoutComponent', 'login() fail: %s', e.message || e)
          }
          , () => {
            this.log.verbose('LoginoutComponent', 'login() user/pass[%s/%s] remember[%s]: loggedIn:%s'
                                                , username
                                                , password
                                                , remember
                                                , this.authService.loggedIn 
                            )
          }
        )
  }
}

export const LoginRoutes: RouterConfig = [
  {
    path: 'login',
    component: LoginComponent
  }
]
