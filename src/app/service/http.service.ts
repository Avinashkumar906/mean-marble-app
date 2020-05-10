import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AlbumService } from './album.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http:HttpClient,
      private albumService:AlbumService,
      private spinnerService: NgxSpinnerService
    ) { }

  // Get images for masonry component
  getMasonryImages(){
    this.spinnerService.show('mainSpinner')
    this.http.get('https://api4asquare.herokuapp.com/getimages').subscribe(
      (data)=>{
        this.albumService.putData(data);
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        this.spinnerService.hide('mainSpinner')
        alert(err.message)
      }
    );
  }

  // get image Data for album component
  getAlbums(){
    this.spinnerService.show('mainSpinner')
    this.http.get('https://api4asquare.herokuapp.com/getalbums').subscribe(
      (data)=>{
        this.albumService.putAlbumData(data);
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        this.spinnerService.hide('mainSpinner')
        alert(err.message)
      }
    );
  }

  // Delete image from masonry component
  deleteMasonryImage(id:string){
    this.spinnerService.show('mainSpinner')
    this.http.get('https://api4asquare.herokuapp.com/deleteimage/'+id).subscribe(
      (data)=>{
        this.getAlbums();
        this.getMasonryImages();
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        this.spinnerService.hide('mainSpinner')
        alert(err.message)
      }
    );
  }

  // Delete Album from album omponnt
  deleteAlbum(id:string){
    this.spinnerService.show('mainSpinner')
    this.http.get('https://api4asquare.herokuapp.com/deletealbum/'+id).subscribe(
      (data)=>{
        this.getAlbums();
        this.getMasonryImages();
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        this.spinnerService.hide('mainSpinner')
        alert(err.message)
      }
    );
  }

  // image uploader to cloudinary using a node api
  imageUploader(form){
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this.http.post('https://api4asquare.herokuapp.com/uploadimage', form, { headers })
  }

  // album & Image data upload to mongo db
  postMasonryImage(form){
    return this.http.post('https://api4asquare.herokuapp.com/postimage', form)
  }

  // Sending mail to avinashkumar906@gmail.com
  sendMessage(form){
    return this.http.post('https://api4asquare.herokuapp.com/postfrommarble',form)
  }

}
