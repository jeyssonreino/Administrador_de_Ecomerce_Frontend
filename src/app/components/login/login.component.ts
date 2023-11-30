import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private route: Router, private loginService: LoginService) {

  }

  FormGroup: FormGroup = new FormGroup({
    username: new FormControl,
    password: new FormControl,
  })

  iniciarSession() {
    let datos = this.FormGroup.value
    this.loginService.loguearUsuario(datos).subscribe((response) => {
      this.route.navigate(['']);
      }, (error) => {
        alert("Correo electronico o contraseña incorrectos, intente de nuevo" );
      });


  }













}
