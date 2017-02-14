import {Component, Input, OnInit, ViewChild, ElementRef, QueryList, Renderer, AfterViewInit } from '@angular/core';


@Component({
    moduleId: module.id,
    selector:'card-slider',
    templateUrl: 'card-slider.component.html'

})
export class CardSliderComponent implements OnInit{
    @Input() slides:any[];
    @Input() show:string = "4";
    @Input() itemtype:string = 'artists';

    // Visual Presentation
    @ViewChild('wrapper') el:ElementRef;
    viewAreaWidth:number; // main element width for animations
    cardWidth:number;
    trackWidth:number;
    
    slideIndex:number = 0;
    numSlides:number;
    sliderPos:number = 0;
    isReady:boolean = false;
    

    constructor(private renderer: Renderer){

    };
    ngOnInit(){
        this.numSlides = this.slides.length;
    }
    ngAfterViewInit() {
        this.adjustView();
        this.isReady = true;
    }
    onResize() { 
        this.adjustView();
    }
    adjustView(){
        this.viewAreaWidth = this.el.nativeElement.offsetWidth;
        this.cardWidth = this.viewAreaWidth / parseInt(this.show); // width of each card
        this.trackWidth = this.cardWidth * this.numSlides; // width of the total track with overflow
        this.setSliderPos();
    }
    setSliderPos(){
        this.sliderPos = (this.slideIndex * (this.cardWidth * parseInt(this.show )) * -1 );
    }
    nextSlide(){
         if(this.slideIndex < ( this.numSlides / parseInt(this.show) ) - 1 ){
            this.slideIndex ++;
         }  
         this.setSliderPos();
    }
    previousSlide(){
         if(this.slideIndex > 0 ){
            this.slideIndex --;
         }
         this.setSliderPos();     
    }


}