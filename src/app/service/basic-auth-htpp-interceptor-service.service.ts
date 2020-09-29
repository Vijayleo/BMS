import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';
import { AuthenticationService } from './jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = sessionStorage.getItem('token');
    if (sessionStorage.getItem('token')) {
      const headers = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json'
      });
      req = req.clone({ headers });
    }

    return next.handle(req);
  }
}
