import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import {Router, RouterModule,Routes} from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';



@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent {

  constructor(private loginService: LoginService, private route:Router){}
  private breakpointObserver = inject(BreakpointObserver);


  obtenerToken(){

    let token = this.loginService.obtenerToken();
    if (token){
      return true;
    }else{
      return false;
    }
  }
  
  salir(){
    if(this.obtenerToken() === true){
      let respuesta =window.confirm("¿Seguro que desea salir de la aplicación?")
      if(respuesta){
        this.loginService.eliminarToken();
        this.loginService.eliminarIdUsuario();
        this.loginService.eliminarEmailUsuario();
        this.route.navigate(['/login']);
      }
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
