import { SpotifyService } from '../services/spotify.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate() {
        if (localStorage.getItem('access_token')) {
            // logged in so return true
            console.log("Login Guard Passed");
            return true;
        }

        // not logged in so redirect to login page
        console.log("Login Guard Failed");
        this._router.navigate(['/login']);
        return false;
    }
}