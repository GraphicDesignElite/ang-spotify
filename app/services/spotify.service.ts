import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SpotifyService{
    private Auth_URL: string = 'http://localhost:5000/';
    private token_expiration_time:number = 3600; // spotify token expiration time

    private searchUrl: string;
    private ArtistUrl: string;
    private ArtistRelatedUrl: string;
    private AlbumsUrl: string;
    private AlbumUrl: string;
    private TracksUrl: string;
    private UserUrl: string;
    private UserFollowingUrl: string;
    private GetCategoriesUrl: string;
    private GetCategoryUrl: string;
    private GetArtistTopTracksUrl:string;
    private GetNewReleases:string;

    // Authorization
    private token:string;
    private refresh_token: string;
    private expires_in: string;
    isAuthorized: Subject<boolean> = new Subject<boolean>();
    isAuthorized$ = this.isAuthorized.asObservable();

    constructor(private _http : Http, private _activatedRoute:ActivatedRoute, private _router: Router ){ 
        console.log('Spotify Services Are Ready');
    }

    // Unprotected Calls ************************ */
    //******************************************* */
    searchMusic(str:string, offset=0, limit=21, type='artist'){
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset='+ offset +'&limit=21&type=' + type + '&market=US';
        return this._http.get(this.searchUrl)
        .map(res => res.json());
    }
    getArtistById(id:string){
    // Return One Artist by Artist ID
        this.ArtistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this._http.get(this.ArtistUrl)
        .map(res => res.json());
    }
    getArtistAlbums(id:string){
    // Return Many Albums by Artist ID
        this.AlbumsUrl = 'https://api.spotify.com/v1/artists/'+ id +'/albums?album_type=album&limit=50&market=us';
        return this._http.get(this.AlbumsUrl)
        .map(res => res.json());        	
    }
    getArtistRelated(id:string){
        this.ArtistRelatedUrl = "https://api.spotify.com/v1/artists/"+ id +"/related-artists";
        return this._http.get(this.ArtistRelatedUrl)
        .map(res => res.json());
    }
    getAlbum(id:string){
    // Return One Album by Album ID
        this.AlbumUrl = 'https://api.spotify.com/v1/albums/'+ id;
        return this._http.get(this.AlbumUrl)
        .map(res => res.json());
    }
    getAlbumTracks(id:string){
    // Return Many Tracks by Album ID
        this.TracksUrl = 'https://api.spotify.com/v1/albums/'+ id + '/tracks';
        return this._http.get(this.TracksUrl)
        .map(res => res.json());
    }

    // Authorization Related Calls ********************* */
    //******************************************* */
    refreshToken(){
        return this._http.get(this.Auth_URL + 'refresh_token/?refresh_token=' + this.refresh_token);
    }
    getAuthorization(){
        // Recieve the Authorization From Spotify and Store it as Our Application Token
        if(this._activatedRoute.snapshot.queryParams['access_token']){
            // Fresh Token Recieved
            this.token = this._activatedRoute.snapshot.queryParams['access_token'];
            this.refresh_token = this._activatedRoute.snapshot.queryParams['refresh_token'];

            // Set Up Token Expiration
            this.expires_in = ((new Date().getTime() / 1000) + this.token_expiration_time).toString(); // add the expiration time to now in seconds        
            // for testing
            //this.expires_in = ((new Date().getTime() / 1000)).toString(); // add the expiration time to now in seconds

            localStorage.setItem('access_token', this.token); // set local storage
            localStorage.setItem('refresh_token', this.refresh_token);
            localStorage.setItem('expires_in', this.expires_in);
            
            this.isAuthorized.next(true);
            this._router.navigate(['search']);
        }
        else if(localStorage.getItem('access_token')){
            // Use a Stored Token as our Application Token if it is not expired
            this.token = localStorage.getItem('access_token');
            this.refresh_token = localStorage.getItem('refresh_token');
            this.expires_in = localStorage.getItem('expires_in');
            
            // Has the token expired?
            var now: Date, expires : Date;
            now = new Date();
            expires = new Date();
            expires.setTime(parseInt(this.expires_in) * 1000);
            
            if(now > expires){
                console.log("Token Expired At: " + expires); 
                this.refreshToken().subscribe(res=>{
                   localStorage.setItem('access_token', res.json().access_token); // set local storage
                   localStorage.setItem('expires_in', ((new Date().getTime() / 1000) + this.token_expiration_time).toString()); // add the expiration time to now in seconds
                   this.isAuthorized.next(true);
                });
            }
            else{
                console.log("Token Still Valid Until :" + expires)
                this.isAuthorized.next(true);
            }
            
        }
        else{
         // No Authorization Aquired
             this.isAuthorized.next(false);
        }
    } 
    removeAuthorization(){
        // Get rid of all authorization tokens and log user out of application ( note does not revoke spotify permissions )
        if(this.isAuthorized){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('expires_in');

            this.isAuthorized.next(false);
            this._router.navigate(['search']); // change to you have been logged out
        }
    }
    // TODO Remove later
    getToken(){ 
        if(this.isAuthorized){
            return this.token;
        }
    }

    // Get User Related Data ********************* */
    //******************************************* */
    getUser(){
    // Gets the logged in User Details - Used in Navigation Display and User Page
        if(this.isAuthorized){
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
            let auth = new RequestOptions({ headers: headers });
            this.UserUrl = 'https://api.spotify.com/v1/me';

            return this._http.get(this.UserUrl, auth)
            .map(res => res.json());
        }
    }
    getUserFollowing(){
    // Gets the logged in User Followed Artists
        if(this.isAuthorized){
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
            let auth = new RequestOptions({ headers: headers });
            this.UserFollowingUrl = 'https://api.spotify.com/v1/me/following?type=artist&limit=30';

            return this._http.get(this.UserFollowingUrl, auth)
            .map(res => res.json());
        }
    }
    // Get Category Data ********************* */
    //******************************************* */
    getCategories(offset=0, limit=30){
    // Gets the full list of categories
        if(this.isAuthorized){
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
            let auth = new RequestOptions({ headers: headers });
            this.GetCategoriesUrl = 'https://api.spotify.com/v1/browse/categories?offset='+ offset + '&limit=' + limit;

            return this._http.get(this.GetCategoriesUrl, auth)
            .map(res => res.json());
        }
    }
    getCategory(id:string, offset=0, limit=20 ){
       if(this.isAuthorized){
           let headers = new Headers({ 'Authorization': 'Bearer ' + this.token  });
           let auth = new RequestOptions({ headers: headers });
           this.GetCategoryUrl = 'https://api.spotify.com/v1/browse/categories/' + id + '/playlists?offset='+ offset + '&limit=' + limit;

            return this._http.get(this.GetCategoryUrl, auth)
            .map(res => res.json());
       } 
    }
    getArtistTopTracks(id:string){
        if(this.isAuthorized){
            let headers = new Headers({'Authorization': 'Bearer ' + this.token });
            let auth = new RequestOptions({headers:headers});
            this.GetArtistTopTracksUrl= "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=US";
            return this._http.get(this.GetArtistTopTracksUrl, auth)
            .map(res => res.json());
        }
    }
    getNewReleases(){
        if(this.isAuthorized){
            let headers = new Headers({'Authorization': 'Bearer ' + this.token });
            let auth = new RequestOptions({headers:headers});
            this.GetNewReleases = "https://api.spotify.com/v1/browse/new-releases";
            return this._http.get(this.GetNewReleases, auth)
            .map(res => res.json());
        }
    }

}