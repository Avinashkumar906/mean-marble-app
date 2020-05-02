import { Component, OnInit, ElementRef } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { ScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {

  currentSection = '';

  constructor(
    private elRef:ElementRef,
    private albumService:AlbumService
    ) {
  }

  ngOnInit() {
    this.albumService.sectionChanged.subscribe(
      (data)=>{
        this.currentSection = data;
      }
    )
  }

  handleScroll(event:ScrollEvent){
    let home = this.elRef.nativeElement.querySelector('#home');
    let image = this.elRef.nativeElement.querySelector('#image');
    let album = this.elRef.nativeElement.querySelector('#album');
    let contact = this.elRef.nativeElement.querySelector('#contact');
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(event)
    if(scroll >= home.offsetTop && scroll < (home.offsetTop + home.offsetHeight) && this.currentSection !== 'home'){
      this.currentSection = 'home';
      this.albumService.sectionChanged.next('home')
    } else if(scroll >= image.offsetTop && scroll < (image.offsetTop + image.offsetHeight) && this.currentSection !== 'image'){
      this.currentSection = 'image';
      this.albumService.sectionChanged.next('image')
    } else if(scroll >= album.offsetTop && scroll < (album.offsetTop + album.offsetHeight) &&  this.currentSection !== 'album'){
      this.currentSection = 'album';
      this.albumService.sectionChanged.next('album')
    }else if(scroll >= contact.offsetTop && scroll < (contact.offsetTop + contact.offsetHeight) &&  this.currentSection !== 'contact'){
      this.currentSection = 'contact';
      this.albumService.sectionChanged.next('contact')
    }
  }
}
