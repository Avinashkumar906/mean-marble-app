import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private smartModalSrvs: NgxSmartModalService
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
  }

  openUploader(){
    if(this.isLogged()){
      this.smartModalSrvs.getModal('upload').open()
    } else {
      this.smartModalSrvs.getModal('login').open()
    }
  }

}
