import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
    private albumService : AlbumService,
    private authService : AuthService,
    private alertService : AlertService,
    private smartModalSrvs :NgxSmartModalService,
  ) { }

  scrollTo(event) {
    event.preventDefault();
    let clickedSection = event.target.getAttribute('data');
    if (clickedSection &&  clickedSection !== this.currentSection) {
      this.currentSection = clickedSection;
      this.albumService.sectionChanged.next(clickedSection)
      
      document.getElementById(clickedSection).scrollIntoView({ 
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }
  ngOnInit(){
    this.sectionChange = this.albumService.sectionChanged.subscribe(
      (data)=>{
        this.currentSection = data;
      }
    )
  }

  logout(){
    this.authService.logout()
    this.alertService.put({title:`Logged Out`,message:`Thanks for visiting us !`,class:'alert-info'})
  }

  login(){
    this.smartModalSrvs.getModal('login').open()
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }

  ngOnDestroy(){
    this.sectionChange.unsubscribe()
  }
}
