import { Component, NgModule } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-agergar-usuario',
  templateUrl: './agergar-usuario.component.html',
  styleUrls: ['./agergar-usuario.component.css']
})
export class AgergarUsuarioComponent {



  FormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre1: new FormControl,
    nombre2: new FormControl,
    apellido1: new FormControl,
    apellido2: new FormControl,
    fechaNacimiento: new FormControl(null),
    sexo: new FormControl('I'),
    telefono: new FormControl,
    correo: new FormControl,
    contrasena: new FormControl,
    fechayHoraDeRegistro: new FormControl(null),
    tipoUsuario: new FormControl('I')
  })



  constructor(private route: Router, private usuarioService: UsuarioService){}

    //Método para agregar una nueva categoria pasandole los datos 
    agregarUsuario() {
      let datosFormlulario = this.FormGroup.value;
      console.log(datosFormlulario)
      if(datosFormlulario.fechaNacimiento === null){
        alert("Registre una fecha de nacimiento valida")
      }else if(datosFormlulario.fechayHoraDeRegistro === null){
        alert("Registre una fecha y hora de registro valida")
      }else{

        this.usuarioService.saveUsuario(datosFormlulario).subscribe((response) => {
          datosFormlulario.fechaNacimiento = datosFormlulario.fechaNacimiento.toISOString();
          datosFormlulario.fechayHoraDeRegistro = datosFormlulario.fechayHoraDeRegistro.toISOString();
        }, (error) => {
          if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
            alert("Usuario guardado con exito")
            this.redireccionarUsuario(); 
          }else{
            alert('Error inesperado: ')
            console.log(error);
          }
        }
        )
      }
    }

    
  //Método para redireccionar a la ruta indicada
  redireccionarUsuario(){
    this.route.navigate(['/usuario'])
  }

}
