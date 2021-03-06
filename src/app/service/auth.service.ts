import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userchanged = new Subject<any>()

  constructor(
    private http:HttpClient
    ) {}

  isAuthenticated() : boolean{
    const token = localStorage.getItem('token');
    if(!token){
      return false; 
    } else {
      return true;
    }
  }

  loginUser(data){
    return this.http.post(`${environment.apiHostName}/signin`, data)
  }

  signupUser(data){
    return this.http.post(`${environment.apiHostName}/signup`, data)
  }

  isAdmin(){
    let user = JSON.parse(localStorage.getItem('user'))
    let result = false;
    if(user && user.role == 'admin')
      result = true;
    return result;
  }

  isUsersFile(id){
    let user = JSON.parse(localStorage.getItem('user'))
    let result = false;
    if(user && user._id == id)
      result = true;
    return result;
  }

  logout(){
    this.userchanged.next(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
