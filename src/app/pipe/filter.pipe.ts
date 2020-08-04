import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchkey?:string): any {
    return _.filter(value,(o)=>{
      return o.title.toLowerCase().includes(searchkey.toLowerCase()) || o.description.toLowerCase().includes(searchkey.toLowerCase()) || o.author.toLowerCase().includes(searchkey.toLowerCase())
    })
  }

}
