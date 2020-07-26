import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private smartModalSrvs: NgxSmartModalService,
    private alertService:AlertService
  ) { }

  user:{name:string};
  ngOnInit() {
    this.user = {name:'Sandy'}
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }

  logout(){
    this.authService.logout()
    this.alertService.put({title:`Logged Out`,message:`Thanks for visiting us !`,class:'alert-info'})
  }

  openUploader(){
    if(this.isLogged()){
      this.smartModalSrvs.getModal('upload').open()
    } else {
      this.smartModalSrvs.getModal('login').open()
    }
  }

}
