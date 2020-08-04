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
    return this.masonryData.slice();
  }

  putData(data){
    this.masonryData = data;
    this.changeDetection.next(this.masonryData.slice());
  }

  updateMasonryData(data){
    this.masonryData.splice(0,0,data)
    this.changeDetection.next(this.masonryData.slice());
  }

  deletedMasonryData(_id){
    _.pullAt(this.masonryData,_.findIndex(this.masonryData,{'_id':_id}))
    this.changeDetection.next(this.masonryData.slice())
  }

  patchedMasonryData(data){
    this.masonryData[_.findIndex(this.masonryData,{'_id':data._id})] = data;
    this.changeDetection.next(this.masonryData.slice())
  }

  uploadMode(id:string|false){
    this.uploadModeChange.next(id)
  }
}
