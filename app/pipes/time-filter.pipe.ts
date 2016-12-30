import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timefilter'})
export class TimeFilterPipe implements PipeTransform {
  transform(value: number, args: number[]): any {
    
        var ms = value % 1000;
        value = (value - ms) / 1000;
        var secs = value % 60;
        value = (value - secs) / 60;
        var mins = value % 60;
        var hrs = (value - mins) / 60;


        var mins_str = "" + mins;
        var secs_str = "" + secs;
        var pad = "00"
        

        var mins_str = pad.substring(0, pad.length - mins_str.length) + mins_str;
        var secs_str = pad.substring(0, pad.length - secs_str.length) + secs_str;
        if(hrs > 0){
            return hrs + ':' + mins_str + ':' + secs_str;        
        }else{
            return mins + ':' + secs_str;
        }
  }
}

