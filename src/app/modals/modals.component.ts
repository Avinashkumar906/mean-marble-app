import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {

  preview:string;
  imageId:string;
  urls:Array<{}> = [];

  constructor(
    private smartModalSrvs : NgxSmartModalService,
  ) { }

  ngOnInit() {
  }

}
