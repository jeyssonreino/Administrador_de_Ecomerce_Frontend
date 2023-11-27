import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

export interface Usuario {
  id:number,
  nombre1:string,
  apellido1:string,
  apellido2:string,
  sexo:string,
  telefono:string,
  correo:string,
  tipo_de_usuario:string
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre1','apellido1','apellido2','sexo','telefono','correo','tipo_de_usuario','opciones'];
  dataSource: Usuario[] = [];

  usuarios: any;

  constructor(private route: Router, private usuarioService: UsuarioService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.obtenerUsuarios();

  }

  //Método obtener la lista de las usuarios registrados en la base de datos 
  obtenerUsuarios() {
    this.usuarioService.getUsuariosToAdmin().subscribe((response: any) => {    //Se llama al servicio para obtener los usuarios
      this.dataSource = response;
    }, (error) => {
      if (error.status === 403) { //Se valida que que el usuario tenga los permisos necesarios
        alert('No tienes permisos');
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
      } else if (error.status === 404) {//Se valida que haya categorias registradas en la base de datos 
        alert('No se encontraron resultados');
      } else {
        alert('Error inesperado');
        console.log(error)
      }
    });
  }

  // Método para eliminar un usuario registrada por su Id 
  eliminarUsuarioPorId(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe((response => {    //Se llama al servicio para eliminar el usuario
    }), (error) => {
      if (error.status === 403) { //Se valida que que el usuario que intenta elimnar tenga los permisos necesarios
        alert('No tienes permisos');
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios s redirecciona al login
      } else {
        alert('Eliminado correctamente');
        location.reload(); //Se recarga la pagina en la misma direccion para que se vean los cambios
      }
    })
  }

  //Método para redireccionar a editarUsuario
  redireccionEditarUsuario(id: number) {
    this.route.navigate([`/editarUsuario/${id}`])
  }

  //Método para redireccionar a agregarUsuario
  redireccionAgregarUsuario() {
    this.route.navigate(['/agregarUsuario'])
  }





}
