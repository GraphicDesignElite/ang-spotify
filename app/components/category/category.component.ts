import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId : module.id,
    selector : 'category',
    templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit{
    category: any;
    categoryName:string;
    paginated: number = 0; // how far we paginated records
    limit: number = 20; // Records to return

    constructor(private _spotifyService: SpotifyService, private _route:ActivatedRoute){
        this._spotifyService.getAuthorization();
    }
    ngOnInit(){
        this._route.params.map(params => params['id']).subscribe(id => {
           this.categoryName = id;
           this._spotifyService.getCategory(id, this.paginated * this.limit, this.limit).subscribe(category =>{
                this.category = category.playlists;
                console.log(this.category);
            })
        });
       
    }
    paginateResults(direction:string){
      if(direction == '+'){
        this.paginated ++;
      }else{
        if(this.paginated > 0){
            this.paginated --;
        }
      }
      this._spotifyService.getCategory(this.categoryName, this.paginated * this.limit, this.limit).subscribe(category =>{
        this.category = category.playlists;
      });
    }
    
}