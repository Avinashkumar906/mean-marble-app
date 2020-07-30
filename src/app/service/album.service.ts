import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  masonryData:Array<{}> = [];
  changeDetection = new Subject<any>();
  sectionChanged = new BehaviorSubject<string>('home')
  uploadModeChange = new BehaviorSubject<Boolean|string>(null)

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

  patchedMasonryData(data){
    let indexToUpdate = _.findIndex(this.masonryData,{'_id':data._id})
    this.masonryData[indexToUpdate] = data;
    console.log(this.masonryData[indexToUpdate])
    this.changeDetection.next(this.masonryData)
  }

  uploadMode(id:string|false){
    this.uploadModeChange.next(id)
  }
}
