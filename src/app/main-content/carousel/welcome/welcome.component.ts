import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlertService } from 'src/app/service/alert.service';
import { AlbumService } from 'src/app/service/album.service';
import { HttpService } from 'src/app/service/http.service';

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
    private albumService: AlbumService,
    private httpService: HttpService
  ) { }

  isPrivate:boolean = false;
  user:any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  
  ngOnInit() {
    this.authService.userchanged.subscribe(
      user=>this.user = user
    )
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }

  openUploader(){
    if(this.isLogged()){
      this.albumService.uploadMode(false);
      this.smartModalSrvs.getModal('upload').open()
    } else {
      this.smartModalSrvs.getModal('login').open()
    }
  }

  goPrivate(){
    if(!this.isPrivate){
      this.httpService.getMyUploads().subscribe(
        (data)=>{
          this.albumService.putData(data);
          this.isPrivate = !this.isPrivate;
          this.alertService.put({title:'Private mode',message:'Now viewing my uploads !'})
        },
        err=>this.alertService.put({title:'Error',message:'Unable to my uploads. Try Again !'})
      )
    } else {
      this.httpService.getMasonryImages().subscribe(
        (data)=>{
          this.albumService.putData(data);
          this.isPrivate = !this.isPrivate;
          this.alertService.put({title:'Public mode',message:'Now viewing public files!'})
        },
        err=>this.alertService.put({title:'Error',message:'Unable to go public. Try Again !'})
      )
    }
  }
}
