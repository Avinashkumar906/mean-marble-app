import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import _ from 'lodash'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit,OnDestroy {

  albums:Array<any> = _.cloneDeep(this.albumService.getData())
  unique:Array<any>;
  selectedChip:string = 'month';
  subscription = new Subscription
  owlOption =
      {
      loop: true,
      margin: 10,
      dots: false,
      nav: true,
      navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      autoplay: false,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1024: {
          items: 3
        }
      }
    }

  constructor(
      private albumService: AlbumService,
      private lightbox:Lightbox,
    ) { }

  ngOnInit() {
    this.unique = _.uniqBy(this.albums,this.selectedChip);
    this.subscription = this.albumService.changeDetection.subscribe(
      (data:Array<any>)=>{
        this.albums = _.cloneDeep(data);
        this.unique = _.uniqBy(this.albums,this.selectedChip);
      },
      error=>console.log(error)
    )
  }

  openLightbox(item){
    const filter = item[this.selectedChip.toString()]
    let temp = _.filter(this.albums,{[this.selectedChip.toString()]:filter})
    let lightboxArray = temp.map((item:{url,description})=>{
        return new Object({
          src : item.url,
          caption : item.description,
          thumb:item.url, 
        })
      })
    this.lightbox.open(lightboxArray, 0, { wrapAround: true, alwaysShowNavOnTouchDevices:true, centerVertically:true, disableScrolling:true });
  }

  groupBy(key:string){
    this.selectedChip = key;
    this.unique = _.uniqBy(this.albums,key);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
