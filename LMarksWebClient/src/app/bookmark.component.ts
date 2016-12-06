import { Component, Input, OnInit } from '@angular/core';
import {Bookmark} from './bookmark';
import {BookmarkService} from './bookmark.service';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
//import {Router} from 'angular2/router';


@Component({
    selector: 'bookmark-app',
    template:`
    
    <a href="http://localhost:3000/">
        <img src="http://i.imgur.com/JUAPEnj.png" alt="Home page" width="287" height="120" border="0">
    </a>
  
    <h3>Search  <input [(ngModel)]="searchName" placeholder="User name" />  <button (click)="search()">+</button> </h3>
    <h3><a href="http://localhost:3000/login">Login</a> </h3>
    <h3><a href="http://localhost:3000/register">Register</a> </h3>
    <h3><a href="http://localhost:3000/logout">Logout</a> </h3>

    <h2> Bookmarks </h2>
    <table style="width:100%">
      <tr *ngFor="let bookmark of bookmarks"
        [class.selected]="bookmark === selectedBookmark"
        (click)="onSelect(bookmark)">
        <span class="badge">  <th> <a href="{{bookmark.link}}">{{bookmark.description}}</a> </th>  <th> {{bookmark.link}} </th> <th> {{bookmark.date | date: 'yyyy/MM/dd'}} </th> <th> <button (click)="delete(bookmark)">X</button> </th> </span> 
      </tr>
      </table>
      <input [(ngModel)]="addDescription" placeholder="Bookmark description" /> <input [(ngModel)]="addLink" placeholder='Website address' />  <button (click)="add()">+</button>

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