import { Observable } from 'rxjs/Observable';
import { Brolog } from 'brolog';
import { User } from '../shared/user';
export declare class AuthService {
    private log;
    loggedIn: boolean;
    redirectUrl: string;
    token: string;
    user: User;
    constructor(log: Brolog);
    login(username: string, password: string): Observable<string>;
    logout(): void;
}
