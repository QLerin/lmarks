import {Component} from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
export class HelloComponent {
  public search: string;
  cUser = JSON.parse(localStorage.getItem('currentUser')); 

  constructor(private authenticationService: AuthenticationService) {
    this.search = 'Search';
  }

  logoff() : void{
      this.authenticationService.logout();
      location.reload();
    }
}
