import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from './authentication.service';
 
@Component({
    selector: 'template-app',
    template: `
    <style>
      @import url('https://fonts.googleapis.com/css?family=Droid+Serif');
    </style>
    <a href="http://localhost:3000/"><img src="http://i.imgur.com/JUAPEnj.png" alt="Home page" width="143" height="60" border="0"></a>

    <div class="toplinks">
        <a href="http://localhost:3000/register" class="button button2">Register</a>
    </div>

    <div class="toplinks">
        <form name="searchForm">
            <input [(ngModel)]="searchName" placeholder="User name" style="width: 80px;" name="login"/>  
            <a href="http://localhost:3000/u/{{searchName}}" class="around"><input type="submit" value="Search" (click)="searchU()" class="button button1"/></a>    
        </form>              
    </div>

    <div class="col-md-6 col-md-offset-3">
    <h2>Login</h2>
    <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
            <div *ngIf="f.submitted && !username.valid" class="help-block">Username is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
            <label for="password">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
            <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
        </div>
        <div class="form-group">
            <button class="button button1">Login</button>
            <div *ngIf="loading"> Wrong password </div>
        </div>
        
    </form>
</div>
`
})
 
export class LoginComponent implements OnInit {
    @Input() searchName: string;
    model: any = {};
    loading = false;
    error = '';
    
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    searchU() : void{
      if(this.searchName != null && this.searchName != ""){
        console.log(this.searchName);
        window.location.href='http://localhost:3000/u/'+this.searchName;
      }
    }
}