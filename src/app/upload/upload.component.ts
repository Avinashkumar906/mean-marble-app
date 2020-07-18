import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../service/http.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private httpService: HttpService,
    private modalService:NgxSmartModalService
  ) { }

  id:String;
  imageForm:any = this.formBuilder.group({
    title:['',Validators.required],
    place:['',Validators.required],
    group:['',Validators.required],
    author:['',Validators.required],
    tags:['',Validators.required],
    more:['',Validators.required],
    description:['',Validators.required],
  });
  cover:File[];
  previewImage:String;

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params)=>{this.id = params.get('id')},
      (error)=>console.log(error)
    )
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
      let user = JSON.parse(localStorage.getItem('user'))
      this.imageForm.value.authorId = user._id;
      this.imageForm.value.authorMail = user.email;
      if(this.cover && this.cover.length>0){
        this.spinnerService.show('mainSpinner')
        for(let i = 0;i<this.cover.length;i++){
          let formdata = new FormData();
          formdata.append('file',this.cover[i],this.cover[i].name);
          formdata.append('body',JSON.stringify(this.imageForm.value));
          let result:any = await this.httpService.postMasonryImage(formdata).toPromise()
          console.log(result);
        }
        this.cover = [];
        this.imageForm.reset()
        alert("uploaded successfully!")
        // this.modalService.getModal('upload').close()
        this.spinnerService.hide('mainSpinner')
      }else{
        alert('please upload a file!')
      }
    } catch (error) {
      console.log(error)
      this.spinnerService.hide('mainSpinner')
    }
  }

}
