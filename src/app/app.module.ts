import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule  } from '@angular/common/http';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { ScrollEventModule } from 'ngx-scroll-event';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './service/auth-interceptor.service'

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CarouselComponent } from './main-content/carousel/carousel.component';
import { MasonryComponent } from './main-content/masonry/masonry.component';
import { AlbumComponent } from './main-content/album/album.component';
import { FooterComponent } from './main-content/footer/footer.component';
import { HttpService } from './service/http.service';
import { ModalsComponent } from './modals/modals.component';
import { AlbumService } from './service/album.service';
import { ScrollSpyDirective } from './service/scroll-spy.directive';
// import { UploadComponent } from './component/upload/upload.component';
import { WelcomeComponent } from './main-content/carousel/welcome/welcome.component';
import { LoginComponent } from './main-content/carousel/login/login.component';
import { AuthService } from './service/auth.service';
import { UploadComponent } from './upload/upload.component';

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
    ScrollSpyDirective,
    // UploadComponent,
    WelcomeComponent,
    LoginComponent,
    UploadComponent
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
    ScrollEventModule,
    ParallaxModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}, HttpService, AlbumService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
