import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit,OnDestroy {

  currentSection = '';

  constructor(
    private elRef:ElementRef,
    private albumService:AlbumService
    ) {
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  ngOnInit() {
    this.albumService.sectionChanged.subscribe(
      (data)=>{
        this.currentSection = data;
      }
    )
    window.addEventListener('scroll', this.scroll, true); 
  }

  scroll = (event): void => {
    let sections = this.elRef.nativeElement.querySelectorAll('.section');
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    sections.forEach(section => {
      let id = section.getAttribute('id')
      if(scroll >= section.offsetTop && scroll < (section.offsetTop + section.offsetHeight) && this.currentSection !== id){
        this.currentSection = id;
          this.albumService.sectionChanged.next(id);
      }
    });
  };
  
}
