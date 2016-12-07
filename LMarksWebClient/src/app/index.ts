import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';

import {HelloComponent} from './hello';
import {BookmarkComponent} from './bookmark.component'
import {BookmarkService} from './bookmark.service'

import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import {LoginComponent} from './login.component';
import {AuthenticationService} from './authentication.service'

import {RegistrationComponent} from './registration.component';
import {RegistrationService} from './registration.service';


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
    BookmarkComponent,
    LoginComponent,
    RegistrationComponent
  ],
  providers: [ BookmarkService,  AuthenticationService, RegistrationService],
  bootstrap: [RootComponent]
})
export class AppModule {}
