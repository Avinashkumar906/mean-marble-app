import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    private alertService:AlertService
  ) { }

  alert:Array<{title:String,message:String,class:String}> = []; 
  // = [
  //   {'title':'hellow!','message':'this is error1','class':'danger'},
  //   {'title':'hellow!','message':'this is error2','class':'danger'},
  //   {'title':'hellow!','message':'this is error3','class':'danger'}
  // ];
  
  ngOnInit() {
    this.alertService.alertchanged.subscribe(
      (data)=>this.alert.push(data)
    )
  }

  dismissAlert(){
    this.alert.splice(this.alert.length-1,1)
  }

  getAlert(){
    if(this.alert.length>0){
      return this.alert[this.alert.length-1]
    } else {
      false
    }
  }

}
