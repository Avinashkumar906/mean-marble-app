import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash'

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any, currentPage:number, numberOfItem:number): any {
    let chunked = _.chunk(value,numberOfItem)
    return chunked[currentPage];
  }

}
