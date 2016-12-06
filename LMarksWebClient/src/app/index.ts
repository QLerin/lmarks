import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';

import {HelloComponent} from './hello';
import {BookmarkComponent} from './bookmark.component'
import {BookmarkService} from './bookmark.service'

import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    RootComponent,
    HelloComponent,
    BookmarkComponent
  ],
  providers: [ BookmarkService ],
  bootstrap: [RootComponent]
})
export class AppModule {}
