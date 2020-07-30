import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../service/http.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlbumService } from '../service/album.service';
import { Subscription } from 'rxjs';

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

  id:String|Boolean;
  imageForm:any = this.formBuilder.group({
    _id:[''],
    alt:[''],
    url:[''],
    profile:[''],
    title:['',[Validators.required,Validators.minLength(6),Validators.maxLength(25)]],
    place:['',[Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
    group:['',[Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
    author:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    tags:['',Validators.required],
    more:['',Validators.required],
    private:['',Validators.required],
    description:['',[Validators.required,Validators.maxLength(120)]],
  });
  cover:File[];
  isUploading:Boolean;
  uploadCount:String;
  subscription = new Subscription

  ngOnInit() {
    this.isUploading = false;
    this.uploadCount = '';
    this.subscription = this.albumService.uploadModeChange.subscribe(
      (data)=> {
        this.updateForm(data)
      }
    )
  }

  updateForm(id){
    this.id = id;
    if(id){
      this.httpService.getMasonryImage(id).subscribe(
        data=>{
          this.imageForm.patchValue(data)
        }
      )
    } else {
      this.imageForm.reset()
    }
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

  isValidTitle(){
    return (!this.imageForm.controls.title.valid && (this.imageForm.controls.title.dirty || this.imageForm.controls.title.touched));
  }
  isValidPlace(){
    return (!this.imageForm.controls.place.valid && (this.imageForm.controls.place.dirty || this.imageForm.controls.place.touched));
  }
  isValidGroup(){
    return (!this.imageForm.controls.group.valid && (this.imageForm.controls.group.dirty || this.imageForm.controls.group.touched));
  }
  isValidTags(){
    return (!this.imageForm.controls.tags.valid && (this.imageForm.controls.tags.dirty || this.imageForm.controls.tags.touched));
  }
  isValidMore(){
    return (!this.imageForm.controls.more.valid && (this.imageForm.controls.more.dirty || this.imageForm.controls.more.touched));
  }
  isValidAuthor(){
    return (!this.imageForm.controls.author.valid && (this.imageForm.controls.author.dirty || this.imageForm.controls.author.touched));
  }
  isValidPrivate(){
    return (!this.imageForm.controls.private.valid && (this.imageForm.controls.private.dirty || this.imageForm.controls.private.touched));
  }
  isValidDescription(){
    return (!this.imageForm.controls.description.valid && (this.imageForm.controls.description.dirty || this.imageForm.controls.description.touched));
  }
  async submit(){
    if(this.id){
      this.updateSubmit()
    } else {
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
  }

  updateSubmit(){
    this.httpService.patchMasonryImage(this.imageForm.value).subscribe(
      data=>{
        console.log(data)
        this.albumService.patchedMasonryData(data)
        this.close()
      }
    )
  }

  close(){
    this.cover = [];
    this.id = false;
    this.imageForm.reset()
    this.isUploading = false;
    this.uploadCount = '';
    this.modalService.getModal('upload').close()
  }

}
