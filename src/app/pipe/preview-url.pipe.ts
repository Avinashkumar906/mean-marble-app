import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash'

@Pipe({
  name: 'previewUrl'
})
export class PreviewUrlPipe implements PipeTransform {

  transform(value: any, mode?:string): any {
    let url;
    let array = _.split(value,'/');
    if(mode === 'back'){
      let w = window.innerWidth;
      let h = window.innerHeight;
      array[array.length-2] = `c_fill,q_auto,f_auto,w_${w},h_${h},g_face`;
      let previewUrl= _.join(array,'/')
      url = `url(${previewUrl})`;
    } else {
      array[array.length-2] = 'q_auto,f_auto,w_600';
      url = _.join(array,'/');
    }
    return url;
  }

}
