import { Injector } from '@angular/core';
import { Subject } from 'rxjs/Rx';
export declare type WechatyEventName = 'scan' | 'login' | 'logout' | 'reset' | 'shutdown' | 'ding' | 'dong' | 'heartbeat' | 'update' | 'error';
export declare type ServerEventName = 'sys';
export declare type IoEventName = 'raw' | WechatyEventName | ServerEventName;
export interface IoEvent {
    name: IoEventName;
    payload: any;
}
export declare class IoService {
    private token;
    private injector;
    private wsProtocol;
    private websocket;
    private subscriber;
    private ioSubject;
    private sendBuffer;
    private log;
    private autoReconnect;
    constructor(token: string, injector: Injector);
    start(): Promise<IoService>;
    stop(): Promise<IoService>;
    initIoSubject(): Promise<{}>;
    initWebSocket(): void;
    io(): Subject<IoEvent>;
    endPoint(): string;
    alive(): boolean;
    ding(payload: any): void;
    wsClose(): void;
    wsSend(e: IoEvent): void;
}
