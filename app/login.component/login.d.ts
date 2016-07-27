import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterConfig } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Brolog } from 'brolog';
import { AuthService } from '../auth.service/index';
export declare class LoginComponent implements OnInit, OnDestroy {
    private authService;
    private router;
    private route;
    private log;
    title: string;
    constructor(authService: AuthService, router: Router, route: ActivatedRoute, log: Brolog);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * NgForm Guide: http://blog.thoughtram.io/angular/2016/03/21/template-driven-forms-in-angular-2.html
     */
    login(form: NgForm): void;
}
export declare const LoginRoutes: RouterConfig;
