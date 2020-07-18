import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private modalService:NgxSmartModalService,
  ) { }
  username:string = '';
  password:string = '';
  useremail:string = '';
  isSignInForm:boolean;

  ngOnInit() {
    this.isSignInForm = true;
  }

  signIn(form){
    if(form.valid){
      this.authService.loginUser(form.value).subscribe(
        (response : any)=>{
          if(response){
            localStorage.setItem("token",response.token.toString())
            localStorage.setItem("user",JSON.stringify(response.user))
            this.modalService.getModal('login').close()
            form.reset()
            alert(`Hi ${response.user.name} !`)
          }
        },
        (err)=>alert(err.error.message)
      );
    } else {
      alert("All fields are required!")
    }
  }

  
  signUp(form){
    if(form.valid){
    this.authService.signupUser(form.value).subscribe(
      (response : any)=>{
        if(response){
          alert(`User ${response.name} registered !`)
          form.reset();
        }
      },
      (err)=>alert(err.error.message)
      );
    } else {
      alert("All fields are required!")
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
    