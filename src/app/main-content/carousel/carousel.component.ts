import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';
import { Subscription } from 'rxjs';
import _ from 'lodash'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit,OnDestroy{

  constructor(
    private albumService: AlbumService,
    private elRef: ElementRef
  ) { }

  myCarousel: Array<{}>;
  subscription = new Subscription;
  owlOption = { items: 1, dots: false, navigation: false, loop: true, autoplay: true }

  ngOnInit() {
    this.myCarousel = _.takeRight(_.shuffle(this.albumService.getData()),10)
    this.subscription = this.albumService.changeDetection.subscribe(
      (data:Array<{}>) => {
        this.myCarousel = _.takeRight(_.shuffle(data),10)
      },
      (err) => console.log(err)
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  getPreviwUrl(url){
    let array = _.split(url,'/');
    let w = window.innerWidth;
    let h = window.innerHeight;
    array[array.length-2] = `c_fill,q_auto,f_auto,w_${w},h_${h},g_face`;
    let previewUrl= _.join(array,'/')
    return previewUrl;
  }
}
