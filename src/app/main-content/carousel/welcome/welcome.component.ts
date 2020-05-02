import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }

  logout(){
    this.authService.logout()
  }
}
