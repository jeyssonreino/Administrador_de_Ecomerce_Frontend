import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  productos:any;

  constructor(private route: Router, private productoService: ProductoService ){
    this.productos = [];
  }


  ngOnInit(): void {
    this.obtenerProductos();
    

    
  }

    //Método obtener la lista de los productos registrados en la base de datos 
    obtenerProductos(){
      this.productoService.getProductosWithFk().subscribe((response) => {    //Se llama al servicio para obtener las categorias
          this.productos = response;
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

    // Método para eliminar un producto registrado por su Id 
  eliminarProductoPorId(id:number){
    this.productoService.deleteProducto(id).subscribe((response => {    //Se llama al servicio para eliminar el producto
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

  //Método para redireccionar a editarProducto
  redireccionEditarProducto(id:number){
    this.route.navigate([`/editarProducto/${id}`])
  }
  
//Método para redireccionar a agregarCategoria
  redireccionAgregarProducto(){
    this.route.navigate(['/agregarProducto'])
  }

}
