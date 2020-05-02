import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router) { }
  username:string = ''
  password:string = ''

  ngOnInit() {
  }

  submit(){
    let user = new Object(
      {
        'email':this.username,
        'password':this.password
      }
    )
    this.authService.loginUser(user).subscribe(
      (response : any)=>{
        if(response){
          localStorage.setItem("token",response.toString())
          // alert('Welcome! navigating to Home Page.')
          this.router.navigate(['index'])
        }
      },
      (err)=>alert(err.error.message)      
    )
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }
  logout(){
    this.authService.logout()
  }
}
