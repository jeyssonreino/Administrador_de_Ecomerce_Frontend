import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  categorias:any;


  constructor(private route: Router,private categoriaService: CategoriaService){
    this.categorias = [];
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }


  //Método obtener la lista de las categorias registradas en la base de datos 
  obtenerCategorias(){
    this.categoriaService.getCategorias().subscribe((response) => {    //Se llama al servicio para obtener las categorias
        this.categorias = response;
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
// Método para eliminar una categoria registrada por su Id 
  eliminarCategoriaPorId(id:number){
    this.categoriaService.deleteCategoria(id).subscribe((response => {    //Se llama al servicio para eliminar la categoria
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
//Método para redireccionar a editarCategoria
  redireccionEditarCategoria(id:number){
    this.route.navigate([`/editarCategoria/${id}`])
  }
  
//Método para redireccionar a agregarCategoria
  redireccionAgregarCategoria(){
    this.route.navigate(['/agregarCategoria'])
  }
  

  

  

}
