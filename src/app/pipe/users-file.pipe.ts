import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../service/auth.service';
import _ from 'lodash'

@Pipe({
  name: 'usersFile'
})
export class UsersFilePipe implements PipeTransform {
  constructor(
    private authService:AuthService
  ){}
  transform(value: any, ...args: any[]): any {
    if(this.authService.isAuthenticated()){
      const { _id,email} = JSON.parse(localStorage.getItem('user'));
      return _.find(value,(id:String)=>id === _id || id === email ? true : false)
    } else{
      return false;
    }
  }

}
