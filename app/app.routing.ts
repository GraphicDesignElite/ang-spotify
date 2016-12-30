import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { TrackListingComponent } from './components/track-listing/track-listing.component';

const appRoutes: Routes = [
    {
        path:'',
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
    }

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);