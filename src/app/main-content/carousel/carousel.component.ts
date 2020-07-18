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
      (data:Array<{}>) => {
        let array = data.sort(()=>Math.random() - .5)
        this.myCarousel = array.map((item:{url},index)=>{
          return index <10 ? item.url : undefined;
        })
        // console.log(this.myCarousel)
      },
      (err) => console.log(err)
    )
  }
}
