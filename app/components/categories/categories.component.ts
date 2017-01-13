import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    moduleId : module.id,
    selector : 'categories',
    templateUrl: 'categories.component.html'
})
export class CategoriesComponent implements OnInit{
    categoriesList: any;

    constructor(private _spotifyService: SpotifyService){
        this._spotifyService.getAuthorization();
    }
    ngOnInit(){
        this._spotifyService.getCategories().subscribe(categoriesList =>{
            this.categoriesList = categoriesList.categories.items;
            console.log(this.categoriesList);
        })
    }
    
}