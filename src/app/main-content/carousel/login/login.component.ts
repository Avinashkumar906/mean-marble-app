import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private modalService:NgxSmartModalService,
    private alertService:AlertService,
  ) { }

  isSignInForm:boolean;
  isSubmitted:boolean;

  ngOnInit() {
    this.isSignInForm = true;
    this.isSubmitted = false;
  }

  signIn(form){
    if(form.valid){
      this.isSubmitted = true;
      this.authService.loginUser(form.value).subscribe(
        (response : any)=>{
          if(response){
            localStorage.setItem("token",response.token.toString())
            localStorage.setItem("user",JSON.stringify(response.user))
            this.isSubmitted = false;
            this.modalService.getModal('login').close()
            this.alertService.put({title:`Logged In`,message:`Welcome ${response.user.name} !`})
          }
        },
        (err)=>{
          this.alertService.put({title:`Login Error`,message:`${err.error.message} !`})
          this.isSubmitted = false;
        }
      );
    } else {
      this.alertService.put({title:`Login Error`,message:`All fields required!`})
    }
  }

  signUp(form){
    if(form.valid){
      this.isSubmitted = true;
      this.authService.signupUser(form.value).subscribe(
        (response : any)=>{
          if(response){
            this.alertService.put({title:`Signed Up`,message:`${response.name} is registered successfully!`})
            this.isSubmitted = false;
            form.reset();
          }
        },
        (err)=>{
          this.alertService.put({title:`Signup Error`,message:`${err.error.message} !`})
          this.isSubmitted = false;
        }
        );
    } else {
      this.alertService.put({title:`Signup Error`,message:`All fields required!`})
    }
  }
      
  submit(form){
    this.isSignInForm ? this.signIn(form) : this.signUp(form)
  }
  
  toggleForm(){
    this.isSignInForm = !this.isSignInForm;
  }
  
  isLogged(){
    return this.authService.isAuthenticated()
  }
}
    