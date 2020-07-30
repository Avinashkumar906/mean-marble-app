import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AlbumService } from './album.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment'

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
    // this.spinnerService.show('mainSpinner')
    return this.http.get(`${environment.apiHostName}/images`)
  }

   // Get image for masonry component
   getMasonryImage(id){
    // this.spinnerService.show('mainSpinner')
    return this.http.get(`${environment.apiHostName}/image?id=${id}`)
  }

  // get image Data for album component
  getAlbums(){
    this.spinnerService.show('mainSpinner')
    this.http.get(`${environment.apiHostName}/albums?filter=month`).subscribe(
      (data)=>{
        
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        this.spinnerService.hide('mainSpinner')
        alert(err.message)
      }
    );
  }

  // Delete image from masonry component
  deleteMasonryImage(image:any){
    // this.spinnerService.show('mainSpinner')
    return this.http.delete(`${environment.apiHostName}/image/?id=${image._id}`)
  }

  // album & Image data upload to mongo db
  postMasonryImage(form){
    return this.http.post(`${environment.apiHostName}/image`, form)
  }

  patchMasonryImage(form){
    return this.http.patch(`${environment.apiHostName}/image`, form)
  }

  // Sending mail to avinashkumar906@gmail.com
  sendMessage(form){
    return this.http.post(`${environment.apiHostName}/mail`,form)
  }

}
