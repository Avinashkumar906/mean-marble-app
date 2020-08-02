import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule  } from '@angular/common/http';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { ParallaxModule } from 'ngx-parallax';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './service/auth-interceptor.service'

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CarouselComponent } from './main-content/carousel/carousel.component';
import { MasonryComponent } from './main-content/masonry/masonry.component';
import { AlbumComponent } from './main-content/album/album.component';
import { FooterComponent } from './main-content/footer/footer.component';
import { WelcomeComponent } from './main-content/carousel/welcome/welcome.component';
import { ModalsComponent } from './modals/modals.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './main-content/carousel/login/login.component';

import { HttpService } from './service/http.service';
import { AlbumService } from './service/album.service';
import { AuthService } from './service/auth.service';
import { AlertService } from './service/alert.service';
import { AlertComponent } from './alert/alert.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UsersFilePipe } from './pipe/users-file.pipe';
import { PreviewUrlPipe } from './pipe/preview-url.pipe';

// import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainContentComponent,
    CarouselComponent,
    MasonryComponent,
    AlbumComponent,
    FooterComponent,
    ModalsComponent,
    WelcomeComponent,
    LoginComponent,
    UploadComponent,
    AlertComponent,
    ErrorpageComponent,
    UsersFilePipe,
    PreviewUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    LightboxModule,
    ParallaxModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}, HttpService, AlbumService, AuthService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
