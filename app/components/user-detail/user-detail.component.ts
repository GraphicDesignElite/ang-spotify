import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'user-detail',
    templateUrl:'user-detail.component.html'
})
export class UserDetailComponent implements OnInit{
    user:any[];
    userFollowing:any[];

    constructor(private _spotifyService: SpotifyService, private _route:ActivatedRoute){
        this._spotifyService.getAuthorization();
    }
    ngOnInit(){
       this._spotifyService.getUser().subscribe(user =>{
           this.user = user;
       })
       this._spotifyService.getUserFollowing().subscribe(userFollowing =>{
           this.userFollowing = userFollowing;
       })
       
    }
}