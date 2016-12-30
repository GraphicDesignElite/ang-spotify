import { Component, Input, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'popularity',
  templateUrl: `popularity.component.html`,
})
export class PopularityComponent implements OnInit {
   @Input() popularity: string;
   
   numberOfBars:number = 10;
   bars: Number[] = [];
   
   constructor(){}

   ngOnInit(){
       for(var i = 0; i < this.numberOfBars; i++){
         this.bars.push(i);
       }
       
   }
   thisPopular(num:Number){
       return parseInt(this.popularity)/10 > num;
   }
}