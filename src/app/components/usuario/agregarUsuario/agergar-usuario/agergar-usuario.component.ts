import { Component, NgModule } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agergar-usuario',
  templateUrl: './agergar-usuario.component.html',
  styleUrls: ['./agergar-usuario.component.css']
})
export class AgergarUsuarioComponent {

  //Objeto de datos de la entidad 
  datos: any = {
    id: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    fechaNacimiento: null,
    sexo: 'I',
    telefono: '',
    correo: '',
    contrasena: '',
    fechayHoraDeRegistro: null,
    tipoUsuario: 'I'
  };

  constructor(private route: Router, private usuarioService: UsuarioService){}

    //Método para agregar una nueva categoria pasandole los datos 
    agregarUsuario() {
      if(this.datos.fechaNacimiento === null){
        alert("Registre una fecha de nacimiento valida")
      }else if(this.datos.fechayHoraDeRegistro === null){
        alert("Registre una fecha y hora de registro valida")
      }else{

        this.usuarioService.saveUsuario(this.datos).subscribe((response) => {
          this.datos.fechaNacimiento = this.datos.fechaNacimiento.toISOString();
          this.datos.fechayHoraDeRegistro = this.datos.fechayHoraDeRegistro.toISOString();
        }, (error) => {
          if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
            alert("Categoria guardada con exito")
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
