import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';
import { PopularityComponent } from '../../components/popularity/popularity.component';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: `search.component.html`,
})
export class SearchComponent  {

    searchStr: string;
    results: Artist[]; // we get all the data here
    paginated: number = 0; // how far we paginated records
    limit: number = 21; // Records to return


    constructor(private _spotifyService:SpotifyService, private _activatedRoute: ActivatedRoute){
         this._spotifyService.getAuthorization();
    }
    searchMusic(){
      if(this.searchStr == ''){
        this.results = null;
      }else{
      this._spotifyService.searchMusic(this.searchStr, this.paginated * this.limit, this.limit).subscribe(results =>{
          this.results = results.artists.items;
        })
      }
    }
    paginateResults(direction:string){
      if(direction == '+'){
        this.paginated ++;
      }else{
        if(this.paginated > 0){
            this.paginated --;
        }
      }
      this.searchMusic();
    }
    
}