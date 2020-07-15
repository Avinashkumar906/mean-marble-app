import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { WelcomeComponent } from './main-content/carousel/welcome/welcome.component';
import { LoginComponent } from './main-content/carousel/login/login.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {path:'index', component:MainContentComponent,
    children: [
      {path: '', component: WelcomeComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {path: 'upload', component: UploadComponent},
  {path: 'upload/:id', component: UploadComponent},
  {path: '**', redirectTo: '/index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
