import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy{

  @Input('isOpen') isOpen: boolean;

  currentSection:string = '';
  sectionChange:Subscription;

  constructor(
    private elRef: ElementRef,
    private albumService : AlbumService,
  ) { }

  scrollTo(event) {
    let clickedSection = event.target.getAttribute('data');
    if (clickedSection &&  clickedSection !== this.currentSection) {
      this.currentSection = clickedSection;
      this.albumService.sectionChanged.next(clickedSection)
      document.getElementById(clickedSection).scrollIntoView({ behavior: 'smooth' });
    }
  }
  ngOnInit(){
    this.sectionChange = this.albumService.sectionChanged.subscribe(
      (data)=>{
        this.currentSection = data;
      }
    )
  }

  ngOnDestroy(){

  }
}
