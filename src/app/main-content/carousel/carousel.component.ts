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
  ) { }

  myCarousel: Array<{}> =_.takeRight(_.shuffle(this.albumService.getData()),10);
  subscription = new Subscription;
  owlOption = { items: 1, dots: false, navigation: false, loop: true, autoplay: true }

  ngOnInit() {
    this.subscription = this.albumService.changeDetection.subscribe(
      data=> this.myCarousel = _.cloneDeep(_.takeRight(_.shuffle(data),10)),
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
  
}
