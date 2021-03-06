import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Bookmark } from './bookmark';
//import { BOOKMARKS} from './mock-bookmarks';


@Injectable()
export class BookmarkService {
    //private headers = new Headers({'Content-Type': 'application/json'});
    //private heroesUrl = 'app/heroes';  // URL to web api
    //http = "http://localhost:3558/b/Admin";

    private headers = new Headers({'Content-Type': 'application/json'}, );
    private bURL = 'http://localhost:3558/';

    private tBookmark;

     constructor(private http: Http) { }

    getUsersBookmarks(name: string): Promise<Bookmark[]> {
        
    const url = `${this.bURL}b/${name}`;
    

    return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Bookmark[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    addBookmark(bm: Bookmark){
        var headers2 = new Headers({'Content-Type': 'application/json'}, );
        var cUser = JSON.parse(localStorage.getItem('currentUser')); 
        headers2.append('Authorization', 'Bearer '+ cUser.token);
        //console.log(headers2);
        const url2 = `${this.bURL}m/`;
        return this.http.post(url2, JSON.stringify(bm), {headers: headers2}).toPromise()
            .then(res => res.json().data).catch(this.handleError);
    }

    deleteBookmark(bm: Bookmark){
        var headers2 = new Headers({'Content-Type': 'application/json'}, );
        var cUser = JSON.parse(localStorage.getItem('currentUser')); 
        headers2.append('Authorization', 'Bearer '+ cUser.token);
        const temp = bm.key;
        const url3 = `${this.bURL}m/${temp}`;
        return this.http.delete(url3, {headers: headers2})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    updateBookmark(bm: Bookmark){
        var headers2 = new Headers({'Content-Type': 'application/json'}, );
        var cUser = JSON.parse(localStorage.getItem('currentUser')); 
        headers2.append('Authorization', 'Bearer '+ cUser.token);
        const url2 = `${this.bURL}m/`+ bm.key;
        return this.http.put(url2, JSON.stringify(bm), {headers: headers2}).toPromise();            
    }
}

