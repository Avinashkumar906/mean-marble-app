import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  message: string = '';

  constructor(
    private httpService: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.spinner.show('mainSpinner')
    if (this.message !== '') {
      let msg = new Object({
        to:"avinashkumar906@gmail.com",
        from: "Marble@WebBySandy",
        subject: "Just a greeting from MARBLE",
        text: "welcome",
        name: "Marble",
        message: this.message
      })
      this.httpService.sendMessage(msg).subscribe(
        (result) => {
          alert('Your Message Send To Admin!');
          this.message = '';
          this.spinner.hide('mainSpinner')
        },
        (err) => {
          alert('Unable to Send Mail! Try After Some Time.');
          this.spinner.hide('mainSpinner')
        }
      )
    }
  }

}
