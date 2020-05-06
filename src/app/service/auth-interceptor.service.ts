import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    if (req.headers.has('InterceptorSkipHeader')) {
      const headers = req.headers.delete('InterceptorSkipHeader');
      return next.handle(req.clone({ headers }));
    } else if(localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      if(token){
        return next.handle(
          req.clone({
            headers:req.headers.append('Authorization', 'Bearer ' + token),
          })
        );
      }
    } else 
    return next.handle(req);
  }
}
