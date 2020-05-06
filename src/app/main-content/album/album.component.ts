import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlbumService } from 'src/app/service/album.service';
import { Lightbox } from 'ngx-lightbox';
import { AuthService } from '../../service/auth.service';

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
      1300:{
          items:3
      }
    }
  }

  constructor(
      private smartModalService:NgxSmartModalService,
      private albumService: AlbumService,
      private lightbox:Lightbox,
      private authService:AuthService
    ) { }

  ngOnInit() {
    this.albumService.changeDetectionAlbum.subscribe(
      (data:Array<{}>)=>this.albums=data
    )
  }

  openLightbox(index){
    let imageArray = []
    let selectedAlbum:any = this.albums[index]
    selectedAlbum.urls.forEach((obj:any)=>{
        imageArray.push({
        src : obj.url,
        caption : selectedAlbum.description,
        thumb : obj.alt
      });
    })
    this.lightbox.open(imageArray, 0, {alwaysShowNavOnTouchDevices:true });
  }

  openUploadAlbum(event){
    this.smartModalService.setModalData({ album: true },'upload')
    this.smartModalService.getModal('upload').open();
  }

  getSubstring(month:string){
    return month.substring(0,3)
  }

  delete(id:string){
    console.log(id)
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }
}