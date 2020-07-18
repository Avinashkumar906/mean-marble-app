import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private modalService:NgxSmartModalService
    ) { }

  isAuthenticated() : boolean{
    const token = localStorage.getItem('token');
    if(!token){
      return false; 
    } else {
      return true;
    }
  }

  loginUser(data){
    return this.http.post('https://api4asquare.herokuapp.com/userlogin', data)
  }

  signupUser(data){
    return this.http.post('https://api4asquare.herokuapp.com/postsignup', data)
  }

  isAdmin(){
    let user = JSON.parse(localStorage.getItem('user'))
    let result = false;
    if(user && user.role == 'admin')
      result = true;
    return result;
  }

  isUsersFile(id,email){
    let user = JSON.parse(localStorage.getItem('user'))
    let result = false;
    if(user && user._id == id && user.email == email)
      result = true;
    return result;
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    alert('thanks for visiting us!')
  }
}
