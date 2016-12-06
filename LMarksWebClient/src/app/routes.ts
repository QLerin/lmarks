/// <reference path="../../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {HelloComponent} from './hello';
import {BookmarkComponent} from './bookmark.component';

@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: HelloComponent
  },
  { 
    path: 'u/:name', component: BookmarkComponent 
  },
];

export const routing = RouterModule.forRoot(routes);
