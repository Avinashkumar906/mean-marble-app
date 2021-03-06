import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';
import { Lightbox } from 'ngx-lightbox';
import { AuthService } from '../../service/auth.service';
import { HttpService } from '../../service/http.service'
import { NgxSpinnerService } from 'ngx-spinner';
import _ from 'lodash'
import { Subscription, from } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss']
})
export class MasonryComponent implements OnInit, OnDestroy {

  images: Array<{}> = this.albumService.getData();
  currentpage: number = 0;
  numberOfItems: number = 12;
  selectedChip: string = 'all';
  searchKey: string = '';
  subscription = new Subscription;
  user: any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  constructor(
    private albumService: AlbumService,
    private lightbox: Lightbox,
    private authService: AuthService,
    private httpService: HttpService,
    private smartModalService: NgxSmartModalService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.subscription = this.albumService.changeDetection.subscribe(
      data => this.images = _.cloneDeep(data)
    )
    this.authService.userchanged.subscribe(
      user => this.user = user
    )
  }

  getTagged() {
    if (this.authService.isAuthenticated()) {
      this.httpService.getMyTags().subscribe(
        data => {
          this.selectedChip = 'tag';
          this.albumService.putData(data)
        },
        err => this.alertService.put({ title: "Error ", message: "Unable to fetch data. Try again" })
      )
    } else {
      this.smartModalService.open('login')
    }
  }

  getMyUploads() {
    if (this.authService.isAuthenticated()) {
      this.httpService.getMyUploads().subscribe(
        data => {
          this.selectedChip = 'upload';
          this.albumService.putData(data)
        },
        err => this.alertService.put({ title: "Error ", message: "Unable to fetch data. Try again" })
      )
    } else {
      this.smartModalService.open('login')
    }
  }

  clear() {
    this.httpService.getMasonryImages().subscribe(
      data => {
        this.selectedChip = 'all';
        this.albumService.putData(data)
      },
      err => this.alertService.put({ title: "Error ", message: "Unable to fetch data. Try again" })
    )
  }

  getLiked() {
    if (this.authService.isAuthenticated()) {
      this.httpService.getMyLiked().subscribe(
        data => {
          this.selectedChip = 'like';
          this.albumService.putData(data)
        },
        err => this.alertService.put({ title: "Error ", message: "Unable to fetch data. Try again" })
      )
    } else {
      this.smartModalService.open('login')
    }
  }

  getPrivate() {
    if (this.authService.isAuthenticated()) {
      this.httpService.getMyPrivate().subscribe(
        data => {
          this.selectedChip = 'private';
          this.albumService.putData(data)
        },
        err => this.alertService.put({ title: "Error ", message: "Unable to fetch data. Try again" })
      )
    } else {
      this.smartModalService.open('login')
    }
  }

  getFavorite() {
    if (this.authService.isAuthenticated()) {
      this.httpService.getMyFavorite().subscribe(
        data => {
          this.selectedChip = 'favorite';
          this.albumService.putData(data)
        },
        err => this.alertService.put({ title: "Error ", message: "Unable to fetch data. Try again" })
      )
    } else {
      this.smartModalService.open('login')
    }
  }

  openLightbox(id: number): void {
    let imgArray = [];
    let tempArray = _.filter(this.images, (o) => {
      return o.title.toLowerCase().includes(this.searchKey.toLowerCase()) || o.description.toLowerCase().includes(this.searchKey.toLowerCase()) || o.author.toLowerCase().includes(this.searchKey.toLowerCase())
    });
    let newIndex = _.findIndex(tempArray, { '_id': id })
    tempArray.forEach((obj: any) => {
      imgArray.push({
        src: obj.url,
        caption: obj.description,
        thumb: obj.url,
      });
    });
    this.lightbox.open(imgArray, newIndex, { wrapAround: true, alwaysShowNavOnTouchDevices: true, centerVertically: true, disableScrolling: true });
  }

  firstPage(element) {
    if (this.currentpage != 0) {
      this.currentpage = 0;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  lastPage(element) {
    if (this.currentpage != Math.ceil(this.images.length / this.numberOfItems) - 1) {
      this.currentpage = Math.ceil(this.images.length / this.numberOfItems) - 1;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextPage(element) {
    if (this.currentpage < Math.ceil(this.images.length / this.numberOfItems) - 1) {
      ++this.currentpage;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  prevPage(element) {
    if (this.currentpage > 0) {
      --this.currentpage;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  delete(image: any) {
    this.spinnerService.show('mainSpinner')
    const { _id } = image
    this.httpService.deleteMasonryImage(image).subscribe(
      (data) => {
        this.albumService.deletedMasonryData(_id)
        this.spinnerService.hide('mainSpinner')
        this.alertService.put({ title: `Updated`, message: `Image Deleted from database` })
      },
      (err) => {
        this.spinnerService.hide('mainSpinner')
        this.alertService.put({ title: `Error in Deletion`, message: `${err.error.message}` })
      }
    );
  }

  like(id) {
    if (this.authService.isAuthenticated()) {
      let userId = JSON.parse(localStorage.getItem('user'))._id;
      this.httpService.likeImage(userId, id).subscribe(
        data => this.albumService.patchedMasonryData(data),
        err => this.alertService.put({ title: `Error`, message: `${err.error.message}` })
      )
    } else {
      this.smartModalService.getModal('login').open()
    }
  }

  heart(id) {
    if (this.authService.isAuthenticated()) {
      let userId = JSON.parse(localStorage.getItem('user'))._id;
      this.httpService.heartImage(userId, id).subscribe(
        data => this.albumService.patchedMasonryData(data),
        err => this.alertService.put({ title: `Error`, message: `${err.error.message}` })
      )
    } else {
      this.smartModalService.getModal('login').open()
    }
  }

  tag(id){
    if (this.authService.isAuthenticated()) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      this.httpService.tagImage(email, id).subscribe(
        data => this.albumService.patchedMasonryData(data),
        err => this.alertService.put({ title: `Error`, message: `${err.error.message}` })
      )
    } else {
      this.smartModalService.getModal('login').open()
    }
  }

  downloadUrl(url) {
    let array = _.split(url, '/')
    const fileName = array[array.length - 1];
    let a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = fileName;
    a.click();
  }

  update(image: any) {
    this.albumService.uploadMode(image._id);
    this.smartModalService.open('upload')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
