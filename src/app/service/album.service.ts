import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  masonryData:Array<{}> = [];
  changeDetection = new Subject<any>();
  sectionChanged = new BehaviorSubject<string>('home')

  getData(){
    return this.masonryData;
  }

  putData(data){
    this.masonryData = data;
    this.changeDetection.next(this.masonryData);
  }

  updateMasonryData(data){
    this.masonryData.push(data)
    this.changeDetection.next(this.masonryData);
  }

}
