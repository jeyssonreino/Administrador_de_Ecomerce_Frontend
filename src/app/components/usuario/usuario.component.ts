import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios:any;

  constructor(private route: Router, private usuarioService: UsuarioService ){
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    
  }

    //Método obtener la lista de las usuarios registrados en la base de datos 
    obtenerUsuarios(){
      this.usuarioService.getUsuarios().subscribe((response) => {    //Se llama al servicio para obtener los usuarios
          this.usuarios = response;
      },(error) =>{
        if(error.status === 403){ //Se valida que que el usuario tenga los permisos necesarios
          alert('No tienes permisos');
          this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
        }else if(error.status === 404){//Se valida que haya categorias registradas en la base de datos 
          alert('No se encontraron resultados');
        }else{
          alert('Error inesperado'); 
          console.log(error)
        }
      });
    }

    // Método para eliminar un usuario registrada por su Id 
  eliminarUsuarioPorId(id:number){
    this.usuarioService.deleteUsuario(id).subscribe((response => {    //Se llama al servicio para eliminar el usuario
    }),(error) => {
      if(error.status === 403){ //Se valida que que el usuario que intenta elimnar tenga los permisos necesarios
        alert('No tienes permisos');
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios s redirecciona al login
      }else{
        alert('Eliminado correctamente');
        location.reload(); //Se recarga la pagina en la misma direccion para que se vean los cambios
      }
    })
  }

  //Método para redireccionar a editarUsuario
  redireccionEditarUsuario(id:number){
    this.route.navigate([`/editarUsuario/${id}`])
  }
  
//Método para redireccionar a agregarUsuario
  redireccionAgregarUsuario(){
    this.route.navigate(['/agregarUsuario'])
  }





}
