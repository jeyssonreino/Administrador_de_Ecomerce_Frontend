import { Component, OnInit } from '@angular/core';
import { DetallePedidoService } from 'src/app/services/detallePedido/detalle-pedido.service';
import { Router } from '@angular/router';


export interface DetallePedido {
  id:number,
  fechaPedido:string,
  horaPedido:string,
  formaPago:string,
  ciudad:string,
  direccion:string,
  estado:string
}

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit{

  displayedColumns: string[] = ['id', 'fechaPedido','horaPedido','formaPago','ciudad','direccion','estado', 'opciones'];
  dataSource: DetallePedido[] = [];


  detallePedidos:any;

  constructor(private route: Router, private serviceDetallePedido: DetallePedidoService){
    this.detallePedidos = [];
  }

  ngOnInit(): void {
    this.obtenerDetallesPedido();
    
  }

    //Método obtener la lista de los detalles del pedido registradas en la base de datos 
    obtenerDetallesPedido(){
      this.serviceDetallePedido.getDetallePedido().subscribe((response:any) => {    //Se llama al servicio para obtener las categorias
        this.dataSource = response;
        console.log(this.dataSource);
      },(error) =>{
        if(error.status === 403){ //Se valida que que el usuario tenga los permisos necesarios
          alert('No tienes permisos');
          this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
        }else if(error.status === 404){//Se valida que haya detalle del pedido registrados en la base de datos 
          alert('No se encontraron resultados');
        }else{
          alert('Error inesperado'); 
          console.log(error)
        }
      });
    }
  // Método para eliminar una detalle del pedido registrado por su Id 
    eliminarDetallePedidoPorId(id:number){
      this.serviceDetallePedido.deleteDetallePedido(id).subscribe((response => {    //Se llama al servicio para eliminar el detalle del pedido
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
  //Método para redireccionar a editarDetallePedido
    redireccionEditarDetallePedido(id:number){
      this.route.navigate([`/editarDetallePedido/${id}`])
    }
    
  //Método para redireccionar a agregarDetallePedido
    redireccionAgregarDetallePedido(){
      this.route.navigate(['/agregarDetallePedido'])
    }

      //Método para redireccionar a agregarDetallePedido
      redireccionFacturacion(id:number){
        this.route.navigate([`/facturacion/${id}`])
      }

}
