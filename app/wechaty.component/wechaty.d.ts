import { OnInit, OnDestroy, EventEmitter, NgZone, Injector } from '@angular/core';
import { Brolog } from 'brolog';
import { IoEvent } from '../io.service/index';
/**
 * for payload
 */
export interface ScanInfo {
    url: string;
    code: number;
}
export interface UserInfo {
    uin: number;
    name: string;
    remark: string;
    sex: number;
    signature: string;
}
export declare class WechatyComponent implements OnInit, OnDestroy {
    private ngZone;
    private log;
    private injector;
    message: EventEmitter<string>;
    scan: EventEmitter<ScanInfo>;
    login: EventEmitter<UserInfo>;
    logout: EventEmitter<UserInfo>;
    error: EventEmitter<any>;
    heartbeat: EventEmitter<any>;
    token: string;
    private timer;
    private timerSub;
    private ioSubscription;
    private ender;
    private ioService;
    counter: number;
    constructor(ngZone: NgZone, log: Brolog, injector: Injector);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onIo(e: IoEvent): void;
    reset(reason: any): void;
    shutdown(reason: any): void;
    startTimer(): void;
    endTimer(): void;
}
