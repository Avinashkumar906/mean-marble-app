import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../service/http.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlbumService } from '../service/album.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private modalService:NgxSmartModalService,
    private albumService : AlbumService
  ) { }

  id:String;
  imageForm:any = this.formBuilder.group({
    title:['',[Validators.minLength(6),Validators.maxLength(25)]],
    place:['',[Validators.minLength(4),Validators.maxLength(16)]],
    group:['',[Validators.minLength(4),Validators.maxLength(16)]],
    author:['',[Validators.minLength(4),Validators.maxLength(20)]],
    tags:['',Validators.required],
    more:['',Validators.required],
    private:['',Validators.required],
    description:['',[Validators.required,Validators.maxLength(60)]],
  });
  cover:File[];
  isUploading:Boolean;
  uploadCount:String;

  ngOnInit() {
    this.isUploading = false;
    this.uploadCount = '';
  }

  handleFileInput(event,element){
    element.innerHTML='';
    this.cover = <File[]>event.target.files;
    for (let index = 0; index < event.target.files.length; index++) {
      const file = event.target.files[index];
      let reader = new FileReader()
      let img = document.createElement("img");
      img.style.margin = "10px";
      img.style.height = "90%";
      reader.onload = ()=>{
        img.src = reader.result.toString();
      }
      reader.readAsDataURL(file)
      element.appendChild(img);
    }
  }

  async submit(){
    try {
      let length = this.cover.length
      if(this.cover && length>0){
        for(let i = 0; i<length;i++){
          this.isUploading = true;
          this.uploadCount = `${i+1} of ${length}`;
          let formdata = new FormData();
          formdata.append('file',this.cover[i],this.cover[i].name);
          formdata.append('body',JSON.stringify(this.imageForm.value));
          let result = await this.httpService.postMasonryImage(formdata).toPromise()
          this.albumService.updateMasonryData(result);
        }
        this.close()
        alert("uploaded successfully!")
      }else{
        alert('please upload a file!')
      }
    } catch (error) {
      console.log(error)
      this.close()
    }
  }

  close(){
    this.cover = [];
    this.imageForm.reset()
    this.isUploading = false;
    this.uploadCount = '';
    this.modalService.getModal('upload').close()
  }

}
