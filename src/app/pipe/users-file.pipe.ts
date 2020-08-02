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
      let userId = JSON.parse(localStorage.getItem('user'))._id;
      return _.find(value,(id:String)=>id === userId ? true : false)
    } else{
      return false;
    }
  }

}
