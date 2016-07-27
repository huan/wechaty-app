import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Brolog } from 'brolog';
import { AuthService } from './auth.service/index';
export declare class AppComponent implements OnInit, OnDestroy {
    private authService;
    private router;
    private log;
    title: string;
    constructor(authService: AuthService, router: Router, log: Brolog);
    ngOnInit(): void;
    ngOnDestroy(): void;
    logout(): void;
}
