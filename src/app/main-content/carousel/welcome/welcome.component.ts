import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlertService } from 'src/app/service/alert.service';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private smartModalSrvs: NgxSmartModalService,
    private alertService:AlertService,
    private albumService: AlbumService
  ) { }

  user:any;
  
  ngOnInit() {
    this.authService.userchanged.subscribe(
      user=>this.user = user
    )
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
      this.albumService.uploadMode(false);
      this.smartModalSrvs.getModal('upload').open()
    } else {
      this.smartModalSrvs.getModal('login').open()
    }
  }

}
