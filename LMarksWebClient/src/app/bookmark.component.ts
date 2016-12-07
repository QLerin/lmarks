import { Component, Input, OnInit } from '@angular/core';
import {Bookmark} from './bookmark';
import {BookmarkService} from './bookmark.service';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
//import {Router} from 'angular2/router';


@Component({
    selector: 'bookmark-app',
    template:`
    <style>
      @import url('https://fonts.googleapis.com/css?family=Droid+Serif');
    </style>
    <a href="http://localhost:3000/">
        <img src="http://i.imgur.com/JUAPEnj.png" alt="Home page" width="143" height="60" border="0">
    </a>

    <div class="toplinks">
    <h3>
    <input [(ngModel)]="searchName" placeholder="User name" style="width: 80px;"/>  <a href="http://localhost:3000/u/{{searchName}}" class="button button1">Search</a>       
    <a href="http://localhost:3000/login" class="button button2">Login</a>
    <a href="http://localhost:3000/register" class="button button2">Register</a>
    <a href="http://localhost:3000/logout" class="button button2">Logout</a>   
    </h3>
    </div>

<br>
    <div class="bookmarkstopic">
    <h2> Bookmarks </h2>
    </div>
    
    <table id="tBM" style="width:100%">
    <tr> <th>Adding date </th> <th>Website address </th>  <th>Website description</th> <tr>
      <tr *ngFor="let bookmark of bookmarks"
        [class.selected]="bookmark === selectedBookmark"
        (click)="onSelect(bookmark)">
        <th> {{bookmark.date | date: 'yyyy-MM-dd'}} </th>
        <th> <a href="{{bookmark.link}}">{{bookmark.description}}</a> </th>  
        <th> {{bookmark.link}} </th> 
        <button class="button buttonx" (click)="delete(bookmark)">✘</button> 
      </tr>
      
      <tr> 
        <th> </th>
        <th> <input [(ngModel)]="addDescription" placeholder="Bookmark description" /> </th> 
        <th> <input [(ngModel)]="addLink" placeholder='Website address' /> 
        </th> <button class="button buttonv" (click)="add()">✔</button> 
      </tr>
      </table>
    `,
     providers: [BookmarkService]
})
export class BookmarkComponent implements OnInit {
    @Input() addLink: string;
    @Input() addDescription: string;
    @Input() searchName: string;
    
    bookmarks: Bookmark[];
    selectedBookmark : Bookmark;
    temporaryBookmark : Bookmark;

    constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.route.params.switchMap((params: Params) => this.bookmarkService.getUsersBookmarks(params['name']))
      .subscribe(bookmarks => { 
          this.bookmarks = bookmarks;
          });
    }
      onSelect(bookmark: Bookmark): void {
      this.selectedBookmark = bookmark;
    }

    add() : void {
      if(this.addLink != null && this.addDescription != null && this.addLink != "" && this.addDescription != ""){
        this.temporaryBookmark = new Bookmark("Admin", this.addLink, this.addDescription);
        this.bookmarkService.addBookmark(this.temporaryBookmark);

        this.route.params.switchMap((params: Params) => this.bookmarkService.getUsersBookmarks(params['name'])).subscribe(bookmarks => { 
          this.bookmarks = bookmarks;
        });
      }
    }

    delete(bookmark: Bookmark) : void {
      if (bookmark != null){
        this.bookmarkService.deleteBookmark(bookmark);
        
        this.route.params.switchMap((params: Params) => this.bookmarkService.getUsersBookmarks(params['name'])).subscribe(bookmarks => { 
          this.bookmarks = bookmarks;
        });
      }
    }

    search() : void {
      console.log("redirect to do"+this.searchName);
      
    }
}