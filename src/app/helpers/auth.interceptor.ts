import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.obtenerToken(); //Se almacena en una variable el token llamando al servicio que a su vez extrae el token de localStored
    if(token){
      const cloned = request.clone({
        headers: request.headers.set('Authorization',`Bearer ${token}`) //Se envia el token almacenado en LocalStored de Angular automaticamente para realizar mas peticiones a la API
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
