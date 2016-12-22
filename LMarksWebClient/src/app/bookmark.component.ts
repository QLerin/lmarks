import { Component, Input, OnInit } from '@angular/core';
import {Bookmark} from './bookmark';
import {BookmarkService} from './bookmark.service';
import { ActivatedRoute, Params }   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';


@Component({
    selector: 'bookmark-app',
    template:`
    <style>
      @import url('https://fonts.googleapis.com/css?family=Droid+Serif');
    </style>
    <a href="http://localhost:3000/"><img src="http://i.imgur.com/JUAPEnj.png" alt="Home page" width="143" height="60" border="0"></a>


    <div *ngIf="cUser == null" class="toplinks">  
    <a href="http://localhost:3000/login" class="button button2">Login</a>
    <a href="http://localhost:3000/register" class="button button2">Register</a>
    </div>
    <div *ngIf="cUser != null" class="toplinks">
    <a href="http://localhost:3000/u/{{cUser.username}}" class="button button2">Your Bookmarks</a>
    <button class="button button2" (click)="logoff()">Logout</button>
    </div>

    <div class="toplinks">
        <form name="searchForm">
        <input [(ngModel)]="searchName" placeholder="User name" style="width: 80px;" name="login"/>  
        <a href="http://localhost:3000/u/{{searchName}}" class="around"><input type="submit" value="Search" (click)="searchU()" class="button button1"/></a>  
    </form>       
    </div>

<br>
    <div class="bookmarkstopic">
    <h2> Bookmarks </h2>
    </div>
    
    <table id="tBM" style="width:100%">
    <tr> <th>Adding date </th> <th>Website link </th>  <th>Website address</th> <tr>
        <tr *ngFor="let bookmark of bookmarks" 
          [class.selected]="bookmark === selectedBookmark"
          (click)="onSelect(bookmark)">
          <ng-container *ngIf='bookmark.visible == 1 || (cUser != null && cUser.username == page)'>
            <th> {{bookmark.date | date: 'yyyy-MM-dd'}} </th>
            <th> <a href="{{bookmark.link}}">{{bookmark.description}}</a> </th>  
            <th> {{bookmark.link}} </th> 
            <button *ngIf='cUser != null && cUser.username == page && bookmark.visible == 1' class="button buttonvis" (click)="setInvisible(bookmark)">Make invisible</button> 
            <button *ngIf='cUser != null && cUser.username == page && bookmark.visible == 0' class="button buttoninvis" (click)="setVisible(bookmark)">Make visible</button> 
            <button *ngIf='cUser != null && cUser.username == page' class="button buttonx" (click)="delete(bookmark)">✘</button> 
          </ng-container>
        </tr>
      
      <tr> 
        <th> </th>
        <th> <input *ngIf="cUser != null && cUser.username == page" [(ngModel)]="addLink" placeholder='Website address' />  </th>
        <th> <input *ngIf="cUser != null && cUser.username == page" [(ngModel)]="addDescription" placeholder="Bookmark description" /> </th> 
        <button *ngIf="cUser != null && cUser.username == page" class="button buttonv" (click)="add()">Add new bookmark</button> 
      </tr>
      </table>
    `,
     providers: [BookmarkService]
})
export class BookmarkComponent implements OnInit {
    @Input() addLink: string;
    @Input() addDescription: string;
    @Input() searchName: string;

    cUser = JSON.parse(localStorage.getItem('currentUser')); 
    page : string;

    bookmarks: Bookmark[];
    selectedBookmark : Bookmark;
    temporaryBookmark : Bookmark;

    constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
      this.page = location.pathname.toString().slice(3);
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
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.temporaryBookmark = new Bookmark(currentUser.username, this.addLink, this.addDescription);
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

    setVisible(bookmark: Bookmark) : void {
      if (bookmark != null){
        bookmark.visible = 1;
        this.bookmarkService.updateBookmark(bookmark);
      }
    }

    setInvisible(bookmark: Bookmark) : void {
      if (bookmark != null){
        bookmark.visible = 0;
        this.bookmarkService.updateBookmark(bookmark);
      }
    }



    logoff() : void{
      this.authenticationService.logout();
      location.reload();
    }

    searchU() : void{
      if(this.searchName != null && this.searchName != ""){
        //console.log(this.searchName);
        window.location.href='http://localhost:3000/u/'+this.searchName;
      }
    }
}