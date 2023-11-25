import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedidos:any;

  constructor(private route: Router,private pedidoService: PedidoService){
    this.pedidos = [];
  }

  ngOnInit(): void {
    this.obtenerPedidos();
    
  }

    //Método obtener la lista de los pedidos registrados en la base de datos 
    obtenerPedidos(){
      this.pedidoService.getPedidos().subscribe((response) => {    //Se llama al servicio para obtener los pedidos
          this.pedidos = response;
      },(error) =>{
        if(error.status === 403){ //Se valida que que el usuario tenga los permisos necesarios
          alert('No tienes permisos');
          console.log(error)
          //this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
        }else if(error.status === 404){//Se valida que haya pedidos registradas en la base de datos 
          alert('No se encontraron resultados');
        }else{
          alert('Error inesperado'); 
          console.log(error)
        }
      });
    }

    // Método para eliminar un pedido registrada por su Id 
  eliminarPedidosPorId(id:number){
    this.pedidoService.deletePedido(id).subscribe((response => {    //Se llama al servicio para eliminar el pedido
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
//Método para redireccionar a editarPedido
  redireccionEditarPedido(id:number){
    this.route.navigate([`/editarPedido/${id}`])
  }
  
//Método para redireccionar a agregarPedido
  redireccionAgregarPedido(){
    this.route.navigate(['/agregarPedido'])
  }

}
