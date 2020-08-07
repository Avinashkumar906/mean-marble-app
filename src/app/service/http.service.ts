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

  // Delete image from masonry component
  deleteMasonryImage(image:any){
    // this.spinnerService.show('mainSpinner')
    return this.http.delete(`${environment.apiHostName}/image/?id=${image._id}`)
  }

  // album & Image data upload to mongo db
  postMasonryImage(form){
    return this.http.post(`${environment.apiHostName}/image`, form)
  }

  patchMasonryImage(form,id){
    return this.http.patch(`${environment.apiHostName}/image/?id=${id}`, form)
  }

  // Sending mail to avinashkumar906@gmail.com
  sendMessage(form){
    return this.http.post(`${environment.apiHostName}/mailservice`,form)
  }

  likeImage(userid,imageid){
    // Like and dislike Api
    return this.http.get(`${environment.apiHostName}/likeimage/?userid=${userid}&imageid=${imageid}`);
  }

  heartImage(userid,imageid){
    // heart and disheart Api
    return this.http.get(`${environment.apiHostName}/heartimage/?userid=${userid}&imageid=${imageid}`);
  }

  tagImage(email,imageid){
    // Tag Untag Api
    return this.http.get(`${environment.apiHostName}/tagimage/?email=${email}&imageid=${imageid}`);
  }

  getMyUploads(){
    return this.http.get(`${environment.apiHostName}/myuploads`);
  }

  getMyPrivate(){
    return this.http.get(`${environment.apiHostName}/myPrivate`);
  }

  getMyLiked(){
    return this.http.get(`${environment.apiHostName}/myliked`);
  }

  getMyFavorite(){
    return this.http.get(`${environment.apiHostName}/myfavorite`);
  }

  getMyTags(){
    return this.http.get(`${environment.apiHostName}/mytags`);
  }
}
