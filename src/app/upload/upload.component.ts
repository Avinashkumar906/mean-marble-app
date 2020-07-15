import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../service/http.service';

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
  ) { }

  id:String;
  imageForm:any = this.formBuilder.group({title:[''],author:[''],place:[''],tags:[''],description:[''],alt:[''],url:[''],more:['']});
  cover:File;
  previewImage:String;

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params)=>{this.id = params.get('id')},
      (error)=>console.log(error)
    )
  }

  handleFileInput(event, element){
    this.cover = <File>event.target.files[0];
    let reader = new FileReader()
    reader.onload = ()=>{
      this.previewImage = "url("+reader.result.toString()+")";
    }
    reader.readAsDataURL(this.cover)
  }

  submit(){
    if(this.cover){
      this.spinnerService.show('mainSpinner')
      let formdata = new FormData();
      formdata.append('file',this.cover,this.cover.name);
      formdata.append('body',JSON.stringify(this.imageForm.value));
      this.httpService.postMasonryImage(formdata).subscribe(
        data=>{
          this.cover = null;
          this.previewImage = null;
          this.imageForm.reset()
          alert("uploaded successfully!")
          console.log(data)
          this.spinnerService.hide('mainSpinner')
        },
        err=>{
          console.log(err)
          this.spinnerService.hide('mainSpinner')
        }
      )
    }else{
      alert('please upload a file!')
    }
  }

}
