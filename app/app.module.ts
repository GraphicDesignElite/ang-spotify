import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { routing } from './app.routing';



import { SpotifyService }  from './services/spotify.service';
import { TimeFilterPipe }  from './pipes/time-filter.pipe';

import { LoginGuard } from './guards/login.guard';
import { LoginComponent }  from './components/login/login.component';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { TrackListingComponent } from './components/track-listing/track-listing.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


import { PopularityComponent } from './components/popularity/popularity.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, routing ],
  declarations: [
                  LoginComponent,
                  AppComponent,
                  NavbarComponent,
                  AboutComponent,
                  SearchComponent,
                  ArtistDetailComponent,
                  UserDetailComponent,
                  TrackListingComponent,
                  PopularityComponent,
                  TimeFilterPipe
                ],
  bootstrap:    [ AppComponent ],
  providers:    [ SpotifyService, LoginGuard ]
})
export class AppModule { }
