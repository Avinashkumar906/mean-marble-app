import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  constructor(
    private albumService: AlbumService,
    private elRef: ElementRef
  ) { }

  myCarousel: Array<{}> = [];
  owlOption = { items: 1, dots: false, navigation: false, loop: true, autoplay: true }

  ngOnInit() {
    this.albumService.changeDetection.subscribe(
      (data) => {
        let array = data.reverse()
        for (let index = 0; index < array.length && index < 10; index++) {
          this.myCarousel.push(array[index]);
        }
      },
      (err) => console.log(err)
    )
  }
}
