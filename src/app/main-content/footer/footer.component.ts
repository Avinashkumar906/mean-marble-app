import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  message: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  website: string = '';

  constructor(
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  submit(form) {
    this.spinner.show('mainSpinner')
    let msg = new Object({
      to: "avinashkumar906@gmail.com",
      from: form.value.email,
      subject: `Greeting from MARBLE`,
      html: ` <h2>Hi Sandy,</h2><br/><h2>${form.value.message}</h2><br/><h4>Regards,</h4><h4>${form.value.name}</h4><h4>${form.value.phone}</h4><h4>${form.value.website}</h4>`,
    })
    this.httpService.sendMessage(msg).subscribe(
      (result) => {
        this.alertService.put({ title: `Mail Sent`, message: `Thanks for writing to us !` })
        form.reset()
        this.spinner.hide('mainSpinner')
      },
      (err) => {
        this.alertService.put({ title: `Mail sending failed`, message: `server error ! please try after some time.` })
        this.spinner.hide('mainSpinner')
      }
    )
  }

}
