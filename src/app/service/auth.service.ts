import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

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
  logout(){
    localStorage.removeItem('token')
    alert('thanks for visiting us!')
  }
}
