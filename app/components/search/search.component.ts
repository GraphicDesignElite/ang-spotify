import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';
import { PopularityComponent } from '../../components/popularity/popularity.component';
import { CardSliderComponent } from '../../components/card-slider/card-slider.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: `search.component.html`,
})
export class SearchComponent implements OnInit  {

    searchStr: string;
    results: Artist[]; // we get all the data here
    newReleases:any[];
    paginated: number = 0; // how far we paginated records
    limit: number = 21; // Records to return


    constructor(private _spotifyService:SpotifyService, private _activatedRoute: ActivatedRoute){
         this._spotifyService.getAuthorization();
         
    }
    ngOnInit(){
        //get new releases
        this._spotifyService.getNewReleases().subscribe(res =>{
            this.newReleases = res.albums.items;
            console.log(this.newReleases);
        });
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