import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertchanged = new Subject<{}>();

  put(data:{}){
    this.alertchanged.next(data)
  }

}
