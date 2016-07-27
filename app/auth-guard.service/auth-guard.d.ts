import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Brolog } from 'brolog';
import { AuthService } from '../auth.service/index';
export declare class AuthGuardService implements CanActivate {
    private authService;
    private router;
    private log;
    constructor(authService: AuthService, router: Router, log: Brolog);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
