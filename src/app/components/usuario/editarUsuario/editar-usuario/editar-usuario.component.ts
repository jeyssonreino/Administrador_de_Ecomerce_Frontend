import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  usuario: any;


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
    this.usuarioService.getUsuarioById(id).subscribe((response:any) => {
      this.FormGroup.setValue({
        id: response.id,
        nombre1: response.nombre1,
        nombre2: response.nombre2,
        apellido1: response.apellido1,
        apellido2: response.apellido2,
        fechaNacimiento: response.fechaNacimiento,
        sexo: response.sexo,
        telefono: response.telefono,
        correo: response.correo,
        contrasena: response.contrasena,
        fechayHoraDeRegistro: response.fechayHoraDeRegistro,
        tipoUsuario: response.tipoUsuario
      })
    })
  }

  //Método para actualizar un usuario pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarUsuarioPorId(id: string, datos: any) {
    if(this.FormGroup.value.fechaNacimiento === ''){
      alert("Registre una fecha de nacimiento valida")
    }else if(this.FormGroup.value.fechayHoraDeRegistro === ''){
      alert("Registre una fecha y hora de registro valida")
    }else{
      id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
      datos = this.FormGroup.value; //Se le pasa una variable categoria que se le asignan los nuevos datos
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
