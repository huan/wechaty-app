import { OnInit, OnDestroy } from '@angular/core';
import { RouterConfig } from '@angular/router';
import { Brolog } from 'brolog';
export declare class MessageComponent implements OnInit, OnDestroy {
    private log;
    title: string;
    constructor(log: Brolog);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare const MessageRoutes: RouterConfig;
