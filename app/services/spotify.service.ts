import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService{
    private searchUrl: string;
    private ArtistUrl: string;
    private AlbumsUrl: string;
    private AlbumUrl: string;
    private TracksUrl: string;

    constructor(private _http : Http ){
        console.log('Spotify Services Are Ready');
    }

    searchMusic(str:string, type='artist'){
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
        return this._http.get(this.searchUrl)
        .map(res => res.json());
    }
    getArtistById(id:string){
        this.ArtistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this._http.get(this.ArtistUrl)
        .map(res => res.json());
    }
    getArtistAlbums(id:string){
        this.AlbumsUrl = 'https://api.spotify.com/v1/artists/'+ id +'/albums';
        return this._http.get(this.AlbumsUrl)
        .map(res => res.json());        	
    }
    getAlbum(id:string){
        this.AlbumUrl = 'https://api.spotify.com/v1/albums/'+ id;
        return this._http.get(this.AlbumUrl)
        .map(res => res.json());
    }
    getAlbumTracks(id:string){
        this.TracksUrl = 'https://api.spotify.com/v1/albums/'+ id + '/tracks';
        return this._http.get(this.TracksUrl)
        .map(res => res.json());
    }
}