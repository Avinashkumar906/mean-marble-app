import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';
import { Lightbox } from 'ngx-lightbox';
import { AuthService } from '../../service/auth.service';
import { HttpService } from '../../service/http.service'
import { NgxSpinnerService } from 'ngx-spinner';
import _ from 'lodash'
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export class MasonryComponent implements OnInit,OnDestroy {

  images:Array<{}>;
  paginationItems:Array<{}> = [];
  currentpage:number = 0;
  numberOfItems:number = 4;
  subscription = new Subscription;
  
  constructor(
      private albumService: AlbumService,
      private lightbox: Lightbox,
      private authService: AuthService,
      private httpService: HttpService,
      private spinnerService: NgxSpinnerService,
      private alertService : AlertService
    ) { }

  ngOnInit() {
    this.images = this.albumService.getData()
    this.fillPaginationArray()
    this.subscription = this.albumService.changeDetection.subscribe(
      (data:Array<{}>)=>{
        this.images = data;
        this.fillPaginationArray()
      }
    )
  }

  openLightbox(index: number): void {
    let imgArray = [];
    let newIndex = (this.currentpage*this.numberOfItems) + index
    this.images.forEach((obj:any)=> {
      imgArray.push({
        src : obj.url,
        caption : obj.description,
        thumb : obj.url,
      });
    });
    this.lightbox.open(imgArray, newIndex, { wrapAround: true, alwaysShowNavOnTouchDevices:true, centerVertically:true, disableScrolling:true });
  }

  fillPaginationArray(){
    let chunked = _.chunk(this.images,this.numberOfItems)
    this.paginationItems = chunked[this.currentpage];
  }

  firstPage(element){
    this.currentpage = 0;
    this.fillPaginationArray()
    element.scrollIntoView({ behavior: 'smooth' });
  }

  lastPage(element){
    this.currentpage = Math.ceil(this.images.length/this.numberOfItems)-1;
    this.fillPaginationArray()
    element.scrollIntoView({ behavior: 'smooth' });
  }

  nextPage(element){
    if(this.currentpage < Math.ceil(this.images.length/this.numberOfItems)-1){
      ++this.currentpage;
      this.fillPaginationArray()
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  prevPage(element){
    if(this.currentpage > 0){
      --this.currentpage;
      this.fillPaginationArray()  
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  delete(image:any,index:number){
    this.spinnerService.show('mainSpinner')
    this.httpService.deleteMasonryImage(image).subscribe(
      (data)=>{
          console.info(data)
          let sliceNumber  = (this.currentpage*this.numberOfItems)+index;
          this.images.splice(sliceNumber,1);
          this.albumService.putData(this.images)
          this.spinnerService.hide('mainSpinner')
          this.alertService.put({title:`Updated`,message:`Image Deleted from database`})
        },
        (err)=>{
          this.spinnerService.hide('mainSpinner')
          this.alertService.put({title:`Error in Deletion`,message:`${err.error.message}`})
        }
      );
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }

  isAdmin(){
    return this.authService.isAdmin()
  }

  isUsersFile(id?:string){
    return this.authService.isUsersFile(id)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
