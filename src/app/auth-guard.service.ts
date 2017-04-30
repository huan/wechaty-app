import { Injectable }             from '@angular/core'
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router'

import { Brolog }                 from 'brolog'

import { AuthService }            from './auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService
    , private router: Router
    , private log: Brolog
  ) {
    log.verbose('AuthGuardService', 'constructor()')
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.verbose('AuthGuardService', 'canActivate(%s)', state.url)
    if (this.authService.loggedIn) {
      this.log.verbose('AuthGuardService', 'canActivate() YES')
      return true
    }

    this.log.verbose('AuthGuardService', 'canActivate() NO')

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = state.url

    // Navigate to the login page
    this.router.navigate(['/login'])
    return false
  }
}
