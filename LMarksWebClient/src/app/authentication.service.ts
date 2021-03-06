import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    private handleServerError(error: Response) {
        if (error.json().error)
            return Observable.throw(error.json().error || 'Server error');
    }
 
    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let grant_type = 'password';
        let client_id = 'resClient';
        let client_secret = 'LMsecret';
        var body = "grant_type=" + grant_type + "&client_id=" + client_id + "&client_secret=" + client_secret + "&username=" + username + "&password=" + password;
        return this.http.post('http://localhost:2680/connect/token', body, {headers: headers}).map((response: Response) => {

                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch(this.handleServerError);
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}