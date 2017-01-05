import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'artist-detail',
    templateUrl:'artist-detail.component.html'
})
export class ArtistDetailComponent implements OnInit{
    id:string;
    artist: Artist;
    albums: Album[];

    constructor(private _spotifyService: SpotifyService, private _route:ActivatedRoute){
        this._spotifyService.getAuthorization();
    }
    ngOnInit(){
        this._route.params.map(params => params['id']).subscribe(id => {
            this._spotifyService.getArtistById(id).subscribe(artist =>{
                this.artist = artist;
                console.log(artist)
            })
            this._spotifyService.getArtistAlbums(id).subscribe(albums =>{
                this.albums = albums.items;
                console.log(this.albums)
            })
        });
    }
}