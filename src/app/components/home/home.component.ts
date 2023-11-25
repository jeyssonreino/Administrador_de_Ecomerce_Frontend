import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private route: Router, private loginService: LoginService){

  }

  cerrarSession(){
    this.loginService.eliminarToken();
    this.route.navigate(['/login']);
  }

  obtenerTokenPorConsola(){
    let token = this.loginService.obtenerToken();
    console.log(token);
  }

  obtenerDetallePedidos(){
    this.loginService.getDetallePedidos().subscribe((response) => {
      console.log(response);
    }, error => {
      if(error.status === 403){
        alert('No tienes permisos')
      }else{
        alert('Error inesperado: ' + error)
      }
    })
    
  }



}
