import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CardSliderComponent } from '../card-slider/card-slider.component';

@Component({
    moduleId: module.id,
    selector: 'artist-detail',
    templateUrl:'artist-detail.component.html'
})
export class ArtistDetailComponent implements OnInit{
    id:string;
    artist: Artist;
    relatedArtists: Artist[];
    albums: Album[];
    topTracks: any[];
    selectedTrack:string;

    constructor(private _spotifyService: SpotifyService, private _route:ActivatedRoute){
        this._spotifyService.getAuthorization();
    }
    ngOnInit(){
        this._route.params.map(params => params['id']).subscribe(id => {
            this._spotifyService.getArtistById(id).subscribe(artist =>{
                this.artist = artist;
            })
            this._spotifyService.getArtistAlbums(id).subscribe(albums =>{
                this.albums = albums.items;
            })
            this._spotifyService.getArtistRelated(id).subscribe(relatedArtists =>{
                this.relatedArtists = relatedArtists.artists;
            })
            this._spotifyService.getArtistTopTracks(id).subscribe(topTracks =>{
                this.topTracks = topTracks;
                console.log(this.topTracks);
            })
        });
    }
    selectTrack(index:string){
        if(this.selectedTrack == index){
            this.selectedTrack = null;
        }else{
        this.selectedTrack = index;
        }
    }
    isComma(index:string, size:string){
        return (parseInt(index) < parseInt(size) - 1);
    }
}