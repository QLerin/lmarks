import {Component} from '@angular/core';


@Component({
  selector: 'fountain-app',
  template: require('./hello.html')
})
export class HelloComponent {
  public search: string;

  constructor() {
    this.search = 'Search';
  }
}
