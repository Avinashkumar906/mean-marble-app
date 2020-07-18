import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlbumService } from 'src/app/service/album.service';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { AuthService } from '../../service/auth.service';
import { HttpService } from '../../service/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums:Array<{}> = this.albumService.getAlbumData()

  owlOption =
  {
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText :["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    autoplay: false,
    responsive:{
      0:{
          items:1
      },
      768:{
          items:2
      },
      1024:{
          items:3
      }
    }
  }

  constructor(
      private albumService: AlbumService,
      private lightbox:Lightbox,
      private authService:AuthService,
    ) { }

  ngOnInit() {
    this.albumService.changeDetectionAlbum.subscribe(
      (data:Array<{}>)=>this.albums=data,
      error=>console.log(error)
    )
  }

  openLightbox(index){
    let selectedAlbum:Array<{}> = <Array<{}>>this.albums[index];
    let lightboxArray:IAlbum[] = <IAlbum[]>selectedAlbum.map((item:{url,description})=>{
      return new Object({
        src : item.url,
        caption : item.description,
        thumb:item.url, 
      })
    })
    this.lightbox.open(lightboxArray, 0, { wrapAround: true, alwaysShowNavOnTouchDevices:true, centerVertically:true, disableScrolling:true });
  }

  getSubstring(month:string){
    return month.substring(0,3)
  }

}
