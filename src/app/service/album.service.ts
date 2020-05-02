import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor() { }

  albumData:Array<{}> = [];
  masonryData:Array<{}> = [];
  changeDetection = new Subject<any>();
  changeDetectionAlbum = new Subject<any>();
  sectionChanged = new BehaviorSubject<string>('home')

  getData(){
    return this.masonryData;
  }
  getAlbumData(){
    return this.albumData;
  }

  putData(data){
    this.masonryData = data;
    this.updateMasonryData();
  }
  putAlbumData(data){
    this.albumData = data;
    this.updateAlbumData();
  }
  updateAlbumData() {
    this.changeDetectionAlbum.next(this.albumData);
  }
  updateMasonryData(){
    this.changeDetection.next(this.masonryData);
  }

}
