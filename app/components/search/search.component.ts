import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/artist.model';
import { PopularityComponent } from '../../components/popularity/popularity.component';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: `search.component.html`,
})
export class SearchComponent  {
    searchStr: string;
    results: Artist[]; // we get all the datat here

    
    constructor(private _spotifyService:SpotifyService){
        
    }
    searchMusic(){
      if(this.searchStr == ''){
        this.results = null;
      }else{
      this._spotifyService.searchMusic(this.searchStr).subscribe(results =>{
          this.results = results.artists.items;
          console.log(this.results);
        })
      }
    }
}