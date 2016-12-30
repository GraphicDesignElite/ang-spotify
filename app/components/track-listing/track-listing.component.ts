import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { PopularityComponent } from '../../components/popularity/popularity.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'track-listing',
    templateUrl: 'track-listing.component.html'
})
export class TrackListingComponent implements OnInit{
    album: Album;
    selectedTrack: string;
    trackListing:any;

    constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute){
       
    }
    ngOnInit(){
        
        this._route.params.map(params => params['id']).subscribe(id =>{
            this._spotifyService.getAlbum(id).subscribe(album => {
                this.album = album;
                console.log(this.album);
            })
            this._spotifyService.getAlbumTracks(id).subscribe(trackListing => {
                this.trackListing = trackListing.items;
                console.log(this.trackListing);
            })
        })
    }
    selectTrack(index:string){
        this.selectedTrack = index;
        console.log("Selected Track " + this.selectedTrack)
    }
}