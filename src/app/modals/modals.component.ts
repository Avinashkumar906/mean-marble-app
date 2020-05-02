import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { FormBuilder } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private httpService:HttpService,
    private formBuilder: FormBuilder,
    private smartModalSrvs : NgxSmartModalService,
    private spinnerService:NgxSpinnerService
  ) { }

  imageForm  = this.formBuilder.group({
    title:[''],
    author:[''],
    place:[''],
    tags:[''],
    description:[''],
    alt:[''],
    url:[''],
    more:['']
  })

  ngOnInit() {
  }

  openUploader(event){
    document.getElementById('file').click();
  }
  openMultiUploader(event){
    document.getElementById('multifile').click();
  }

  async handleMultiFileInput(event){
    if(event.target.files){
      this.spinnerService.show('mainSpinner')
      for(let i = 0; i < event.target.files.length; i++){
        let formdata = new FormData();
        formdata.append('file',event.target.files[i]);
        let result:any = await this.httpService.imageUploader(formdata).toPromise()
        this.urls.push({ url: result.secure_url, alt: result.public_id })
      }
      this.spinnerService.hide('mainSpinner')
    }
  }

  handleFileInput(event:any) {
    this.spinnerService.show('mainSpinner')
    this.preview =  'https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif';
    let formdata = new FormData();
    formdata.append('file',event.target.files[0]);
    this.httpService.imageUploader(formdata).subscribe(
      (data:any)=>{
        this.preview = data.secure_url;
        this.imageId = data.public_id;
        this.spinnerService.hide('mainSpinner')
      },
      (err)=>{
        alert('unable to upload !/n' + err.message)
        this.spinnerService.hide('mainSpinner')
      }
    )
  }

  submit(){
    this.spinnerService.show('mainSpinner')
    this.imageForm.value.alt = this.imageId;
    this.imageForm.value.url = this.preview;
    if(this.urls.length > 0){
      this.imageForm.value.urls = this.urls;
      this.imageForm.value.album = true;
      // console.log('album');
    } else {
      this.imageForm.value.image = true;
      // console.log('image');
    }
    let object = new Object(this.imageForm.value);
    if(this.preview){
      this.httpService.postMasonryImage(object).subscribe(
        (data)=>{
          this.smartModalSrvs.getModal('upload').close();
          this.httpService.getMasonryImages();
          this.httpService.getAlbums();
        },
        (err)=>console.log(err.message)
      )
    } else {
      alert('please upload a file!')
    }
  }
}
