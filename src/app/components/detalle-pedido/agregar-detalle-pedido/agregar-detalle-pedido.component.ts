import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedidoService } from 'src/app/services/detallePedido/detalle-pedido.service';

@Component({
  selector: 'app-agregar-detalle-pedido',
  templateUrl: './agregar-detalle-pedido.component.html',
  styleUrls: ['./agregar-detalle-pedido.component.css']
})
export class AgregarDetallePedidoComponent {

  //Objeto de datos de la entidad 
  datos: any = {
    id: '',
    fechaPedido: '',
    horaPedido: '',
    formaPago: 'I',
    ciudad: '',
    direccion: '',
    estado: 'I'
  };

  constructor(private route:Router, private detallePedidoService: DetallePedidoService ){}

    //Método para agregar un nuevo detalle del pedido pasandole los datos 
    agregarDetallePedido() {
      if(this.datos.formaPago === 'I'){
        alert("Seleccione una forma de pago del pedido valido")
      }else if(this.datos.estado === 'I'){
        alert("Seleccione un estado del pedido valido")
      }else if(this.datos.fechaPedido === '' || this.datos.horaPedido === '' || this.datos.ciudad === '' || this.datos.direccion === ''){
        alert("Complete todos los campos")
      }else{
        this.detallePedidoService.saveDetallePedido(this.datos).subscribe((response) => {
        }, (error) => {
          if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
            alert("Categoria guardada con exito")
            this.redireccionarDetallePedido(); 
          }else{
            alert('Error inesperado: ')
          }
        }
        )
      }
    }
  
    //Método para redireccionar a la ruta indicada
    redireccionarDetallePedido(){
      this.route.navigate(['/detallePedido'])
    }

}
