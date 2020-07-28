import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';
import _ from 'lodash'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    private alertService:AlertService
  ) { }

  alert:Array<{}> = [];
  
  ngOnInit() {
    this.alertService.alertchanged.subscribe(
      (data:any)=>{
        data.time = `${new Date().toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })}`
        this.alert.push(data)
      }
    )
  }

  dismissAlert(index:number){
    _.pullAt(this.alert,index)
  }

  getAlerts(){
    return _.take(this.alert,2)
  }

}
