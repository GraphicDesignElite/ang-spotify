import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';

import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { TrackListingComponent } from './components/track-listing/track-listing.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const appRoutes: Routes = [
    {
        path:'search',
        component: SearchComponent
    },

    {
        path:'about',
        component: AboutComponent
    },
    {
        path:'artist/:id',
        component: ArtistDetailComponent
    },
    {
        path:'albums/:id',
        component: TrackListingComponent
    },
    {
        path:'user/:id',
        component: UserDetailComponent,
        canActivate: [LoginGuard]
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: '**', 
        pathMatch: 'full',
        redirectTo:'/search'
    }

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);