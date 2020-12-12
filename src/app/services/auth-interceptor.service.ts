import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionSbService} from "./session-sb.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private session:SessionSbService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.session.getTokenFromSessionStorage();
    console.log("Stored token : " + token)
    if (token != null){
      const modifiedRequest = req.clone({setHeaders:{Authorization:token}});
      console.log(modifiedRequest);
      return next.handle(modifiedRequest);
    }else {
      return next.handle(req);
    }
  }

}
