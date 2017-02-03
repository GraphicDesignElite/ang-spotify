import {Component, Input, OnInit, ViewChildren, ElementRef, QueryList, Renderer, AfterViewInit } from '@angular/core';


@Component({
    moduleId: module.id,
    selector:'card-slider',
    templateUrl: 'card-slider.component.html'

})
export class CardSliderComponent implements OnInit{
    @Input() slides:any;
    @Input() show:string = "4";

    slideIndex:number = 0;
    numSlides:number;
    

    constructor(private renderer: Renderer){};

    ngOnInit(){
        this.numSlides = this.slides.length;

    }
    isShown(x:number){
        if((x < this.slideIndex + parseInt(this.show)) && (x >= this.slideIndex) ){
            return "seen";
        }
        else{
            return "unseen";
        }
    }
    nextSlide(){
         if(this.slideIndex < this.numSlides - parseInt(this.show)){
             this.slideIndex ++;
         }       
    }
    previousSlide(){
         if(this.slideIndex > 0){
             this.slideIndex --;
         }       
    }


}