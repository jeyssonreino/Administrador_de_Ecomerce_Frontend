import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo?: string;
  contrasena?: string;

  constructor(private route: Router, private loginService: LoginService) {

  }

  iniciarSession() {
    let datos = {
      username: this.correo,
      password: this.contrasena
    }
    this.loginService.loguearUsuario(datos).subscribe((response) => {
      this.route.navigate(['']);
      }, (error) => {
        console.log("Correo electronico o contraseña incorrectos, intente de nuevo" );
      });


  }













}
