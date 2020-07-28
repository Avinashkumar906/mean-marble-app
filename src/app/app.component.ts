import { Component, ElementRef, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

import * as AOS from 'aos';
import { AlbumService } from './service/album.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  toggle:boolean = false;
  title:string = 'marble gallery';
  isLoaded:boolean = false;

  constructor(
      private elRef:ElementRef,
      private httpService: HttpService,
      private albumService: AlbumService,
      private spinnerService:NgxSpinnerService
      ){
    AOS.init({
      duration: 500,
      easing: 'ease-in-sine',
    })
  }

  ngOnInit(){
    this.spinnerService.show('mainSpinner')
    this.httpService.getMasonryImages().subscribe(
      (data)=>{
        this.isLoaded = true;
        this.albumService.putData(data);
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        this.spinnerService.hide('mainSpinner')
        alert(err.message)
      }
    );;
  }

  toggleSideNav(event){
    if(!this.toggle)
    {
      this.toggle = true;
      this.elRef.nativeElement.querySelector('.side-nav').style.marginLeft = "0";
    } else {
      if(event.target.id === 'navBar'){
        this.toggle = false;
        this.elRef.nativeElement.querySelector('.side-nav').style.marginLeft = "-400px";
      }
    }
  }

}
