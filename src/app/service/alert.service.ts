import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertchanged = new Subject<{title:String,message:String,class:String}>();

  put(data:{title:String,message:String,class:String}){
    this.alertchanged.next(data)
  }

}
