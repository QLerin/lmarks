import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import {RegistrationService} from './registration.service';
import { User} from './user';
 
 
@Component({
    selector: 'registration-app',
    template: `
    <style>
        @import url('https://fonts.googleapis.com/css?family=Droid+Serif');
        @import url('https://fonts.googleapis.com/css?family=Montserrat');
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
    <input [(ngModel)]="searchName" placeholder="User name" style="width: 80px;"/>  <a href="http://localhost:3000/u/{{searchName}}" class="button button1">Search</a>         
    </div>

    <div class="col-md-6 col-md-offset-3">
    <h2>Register</h2>
        <div class="form-group">
            <label>Email address</label>
            <input [(ngModel)]="email" placeholder='Email' /> 
        </div>
        <div class="form-group">
            <label>User name</label>
            <input [(ngModel)]="login" placeholder='Username' /> 
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="pass" placeholder='password' /> 
        </div>
        <div class="form-group">
            <button class="button button1" (click)="register()">Register</button>  
            <a [routerLink]="['/']" class="button buttonx" >Cancel</a>
        </div>
    </div>

`
})
 
export class RegistrationComponent{
    @Input() login: string;
    @Input() email: string;
    @Input() pass: string;

    cUser = JSON.parse(localStorage.getItem('currentUser')); 
    model: any = {};
 
    constructor(
        private router: Router, private registrationService: RegistrationService) { }
 
    register() {
        console.log(this.email + this.login + this.pass)
        if(this.email != null && this.email != "" && this.login != null && this.login != "" && this.pass != null && this.pass != ""){
            var temp = new User(this.login, this.email, this.pass);
            this.registrationService.addUser(temp);
            this.router.navigateByUrl('/login');
        }

    }
 

}