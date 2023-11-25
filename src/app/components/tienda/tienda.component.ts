import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/services/tienda/tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit{

  tiendas:any;


  constructor(private route:Router, private tiendaService: TiendaService){
    this.tiendas = [];
  }

  ngOnInit(): void {
    this.obtenerTiendas();
    
  }

    //Método obtener la lista de las tiendas registradas en la base de datos 
    obtenerTiendas(){
      this.tiendaService.getTiendas().subscribe((response) => {    //Se llama al servicio para obtener las tiendas
          this.tiendas = response;
      },(error) =>{
        if(error.status === 403){ //Se valida que que el usuario tenga los permisos necesarios
          alert('No tienes permisos');
          this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
        }else if(error.status === 404){//Se valida que haya tiendas registradas en la base de datos 
          alert('No se encontraron resultados');
        }else{
          alert('Error inesperado'); 
          console.log(error)
        }
      });
    }

    // Método para eliminar una tienda registrada por su Id 
  eliminarTiendaPorId(id:number){
    this.tiendaService.deleteTienda(id).subscribe((response => {    //Se llama al servicio para eliminar la tienda
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



  //Método para redireccionar a editarTienda
  redireccionEditarTienda(id:number){
    this.route.navigate([`/editarTienda/${id}`])
  }
  
//Método para redireccionar a agregarTienda
  redireccionAgregarTienda(){
    this.route.navigate(['/agregarTienda'])
  }
  

}
