import { Component, Input} from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
export class MainComponent {
   @Input() searchName: string;
  public search: string;
  cUser = JSON.parse(localStorage.getItem('currentUser')); 

  constructor(private authenticationService: AuthenticationService) {
    this.search = 'Search';
  }

  logoff() : void{
      this.authenticationService.logout();
      location.reload();
  }

    searchU() : void{
      if(this.searchName != null && this.searchName != ""){
        console.log(this.searchName);
        window.location.href='http://localhost:3000/u/'+this.searchName;
      }
    }
}
