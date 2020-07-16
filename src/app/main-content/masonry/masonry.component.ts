import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlbumService } from 'src/app/service/album.service';
import { Lightbox } from 'ngx-lightbox';
import { AuthService } from '../../service/auth.service';
import { HttpService } from '../../service/http.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export class MasonryComponent implements OnInit,AfterViewInit {

  images:Array<{}> = this.albumService.getData()
  paginationItems:Array<{}> = [];
  currentpage:number = 0;
  numberOfItems:number = 10;
  constructor(
      private albumService: AlbumService,
      public smartModalSrvs: NgxSmartModalService,
      private lightbox: Lightbox,
      private authService: AuthService,
      private httpService: HttpService,
      private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit() {
     this.albumService.changeDetection.subscribe(
      (data:Array<{}>)=>{
        this.images=data.reverse();
        //console.log(data)
        this.paginationItems = [];
        for(let i = this.currentpage; i<data.length && i<this.numberOfItems; i++){
          this.paginationItems.push(data[i])
        }
      }
    )
  }
  openLightbox(index: number): void {
    let imgArray = [];
    this.images.forEach((obj:any)=> {
      imgArray.push({
        src : obj.url,
        caption : obj.description,
        thumb : obj.url,
      });
    });
    this.lightbox.open(imgArray, index, { wrapAround: true, alwaysShowNavOnTouchDevices:true, centerVertically:true, disableScrolling:true });
  }
  firstPage(element){
    let index = 0;
    if(this.currentpage != 0){
      this.currentpage = 0;
      for(let i = this.currentpage*this.numberOfItems; i<this.images.length && i< (this.currentpage*this.numberOfItems+this.numberOfItems); i++){
        this.paginationItems[index] = this.images[i]
        index++;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  lastPage(element){
  let index = 0;
    if(this.currentpage != Math.ceil(this.images.length/this.numberOfItems)-1){
      this.currentpage = Math.ceil(this.images.length/this.numberOfItems) - 1;
      for(let i = this.currentpage*this.numberOfItems; i<this.images.length && i< (this.currentpage*this.numberOfItems+this.numberOfItems); i++){
        this.paginationItems[index] = this.images[i]
        index++;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextPage(element){
    let index = 0;
    if(this.currentpage < Math.ceil(this.images.length/this.numberOfItems)-1){
      this.currentpage++;
      for(let i = this.currentpage*this.numberOfItems; i<this.images.length && i< (this.currentpage*this.numberOfItems+this.numberOfItems); i++){
        this.paginationItems[index] = this.images[i]
        index++;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  prevPage(element){
    let index = 0;
    if(this.currentpage>0){
      this.currentpage--;
      for(let i = this.currentpage*this.numberOfItems; i<this.images.length && i< (this.currentpage*this.numberOfItems+this.numberOfItems); i++){
        this.paginationItems[index] = this.images[i];
        index++;
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openUpload(event){
    this.smartModalSrvs.getModal('upload').open()
  }

  delete(id:string,index:number){
    this.spinnerService.show('mainSpinner')
    this.httpService.deleteMasonryImage(id).subscribe(
      (data)=>{
          console.info(data)
          this.paginationItems.splice(index,1);
          this.spinnerService.hide('mainSpinner')
        },
        (err)=>{
          this.spinnerService.hide('mainSpinner')
          alert(err.message)
        }
      );
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }

  ngAfterViewInit() {  }

}
