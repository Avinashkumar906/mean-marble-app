import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  preview:string;
  imageId:string;
  urls:Array<{}> = [];

  constructor(
    private smartModalSrvs : NgxSmartModalService,
  ) { }

  ngOnInit() {
  }

  // async handleMultiFileInput(event){
  //   if(event.target.files){
  //     this.spinnerService.show('mainSpinner')
  //     for(let i = 0; i < event.target.files.length; i++){
  //       let formdata = new FormData();
  //       formdata.append('file',event.target.files[i]);
  //       let result:any = await this.httpService.imageUploader(formdata).toPromise()
  //       this.urls.push({ url: result.secure_url, alt: result.public_id })
  //     }
  //     this.spinnerService.hide('mainSpinner')
  //   }
  // }

  // submit(){
  //   this.spinnerService.show('mainSpinner')
  //   this.imageForm.value.alt = this.imageId;
  //   this.imageForm.value.url = this.preview;
  //   if(this.urls.length > 0){
  //     this.imageForm.value.urls = this.urls;
  //     this.imageForm.value.album = true;
  //     // console.log('album');
  //   } else {
  //     this.imageForm.value.image = true;
  //     // console.log('image');
  //   }
  //   let object = new Object(this.imageForm.value);
  //   if(this.preview){
  //     this.httpService.postMasonryImage(object).subscribe(
  //       (data)=>{
  //         this.smartModalSrvs.getModal('upload').close();
  //         this.imageForm.reset()
  //         this.urls = [];
  //         this.imageId = null;
  //         this.preview = null;
  //         this.closeModal();
  //       },
  //       (err)=>console.log(err.message)
  //     )
  //   } else {
  //     alert('please upload a file!')
  //   }
  // }

  // closeModal(){
    
  //   this.httpService.getMasonryImages();
  //   this.httpService.getAlbums();
  // }
}
