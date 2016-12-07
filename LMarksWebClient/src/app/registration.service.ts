import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User} from './user';




@Injectable()
export class RegistrationService {

    private headers = new Headers({'Content-Type': 'application/json'}, );
    private bURL = 'http://localhost:1915/u';

    private tBookmark;

     constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addUser(user : User){
        const url2 = `${this.bURL}/`;
        
        return this.http.post(url2, JSON.stringify(user), {headers: this.headers}).toPromise()
            .then(res => res.json().data).catch(this.handleError);
    }

}

