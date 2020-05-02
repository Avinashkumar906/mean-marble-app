import { Component, ElementRef, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit{

  toggle:boolean = false;
  title:string = 'marble gallery';

  constructor(
      private elRef:ElementRef,
      private httpService: HttpService
      ){
    AOS.init({
      duration: 500,
      easing: 'ease-in-sine',
    })
  }

  ngOnInit(){
    this.httpService.getMasonryImages();
    this.httpService.getAlbums();
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

  ngAfterViewInit(){
      // observer.observe();
  }
  ngAfterContentInit(): void {
  }

}
