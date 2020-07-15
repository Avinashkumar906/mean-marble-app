import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')) {
        return next.handle(
          req.clone({
            headers:req.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`),
          })
        );
    } else 
      return next.handle(req);
  }
}
