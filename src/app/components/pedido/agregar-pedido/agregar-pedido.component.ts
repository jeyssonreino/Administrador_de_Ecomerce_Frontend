import { Component } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent {

  //Objeto de datos de la entidad 
  datos: any = {
    id: '',
    idDetallePedido: null,
    idProducto: '',
    idUsuario: ''
  };

  constructor(private route: Router,private pedidoService: PedidoService){}

    //Método para agregar un nuevo pedido pasandole los datos 
    agregarPedido() {
      if(this.datos.idProducto === '' || this.datos.idUsuario === ''){
        alert("Complete todos los campos")
      }else{
        this.pedidoService.savePedido(this.datos).subscribe((response) => {
        }, (error) => {
          if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
            alert("Categoria guardada con exito")
            this.redireccionarPedido(); 
          }else{
            alert('Error inesperado: ')
            console.log(error);
          }
        }
        )
      }
    }
  
    //Método para redireccionar a la ruta indicada
    redireccionarPedido(){
      this.route.navigate(['/pedido'])
    }
  
  }


