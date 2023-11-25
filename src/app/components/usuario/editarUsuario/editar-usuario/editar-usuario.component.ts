import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  usuario: any;


  //Objeto nuevo que reemplezar y actualizara al objeto registrado en la base de datos 
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



  constructor(private route: Router, private activateRoute: ActivatedRoute, private usuarioService: UsuarioService) {
    this.usuario = {};
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.obtenerUsuarioPorId(this.id);

  }

  //Método para obtener el usuario mediante su Id 
  obtenerUsuarioPorId(id: string) {
    id = this.id;
    this.usuarioService.getUsuarioById(id).subscribe((response) => {
      this.datos = response;
    })
  }

  //Método para actualizar un usuario pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarUsuarioPorId(id: string, datos: any) {
    if(this.datos.fechaNacimiento === ''){
      alert("Registre una fecha de nacimiento valida")
    }else if(this.datos.fechayHoraDeRegistro === ''){
      alert("Registre una fecha y hora de registro valida")
    }else{
      id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
      datos = this.datos; //Se le pasa una variable categoria que se le asignan los nuevos datos
      this.usuarioService.updateUsuario(id, datos).subscribe((response) => {
      }, (error) => {   
        if (error.status === 200) { // Si el estado de la respuesta es 200 entonces se actualizo exitosamente
          alert('actualizado exitosamente');
          this.redireccionarUsuario();
        }
      })
    }
  }

  //Método para redireccionar a la ruta indicada
  redireccionarUsuario() {
    this.route.navigate(['/usuario'])
  }

}
