import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallePedidoService } from 'src/app/services/detallePedido/detalle-pedido.service';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-detalle-pedido',
  templateUrl: './editar-detalle-pedido.component.html',
  styleUrls: ['./editar-detalle-pedido.component.css']
})
export class EditarDetallePedidoComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  detallePedido: any;

  //Objeto nuevo que reemplezar y actualizara al objeto registrado en la base de datos 
  datos: any = {
    id: '',
    fechaPedido: '',
    horaPedido: '',
    formaPago: 'I',
    ciudad: '',
    direccion: '',
    estado: 'I'
  };


  constructor(private route: Router, private activateRoute: ActivatedRoute, private detallePedidoService: DetallePedidoService) {
    this.detallePedido = {};
  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.obtenerDetalleProductoPorId(this.id);

  }

  //Método para obtener un detalle del pedido mediante su Id 
  obtenerDetalleProductoPorId(id: string) {
    id = this.id;
    this.detallePedidoService.getDetallePedidoById(id).subscribe((response) => {
      this.datos = response;
    })
  }

  //Método para actualizar un detalle del pedido pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarDetallePedidoPorId(id: string, detallePedido: any) {
    if (this.datos.formaPago === 'I') {
      alert("Seleccione una forma de pago del pedido valido")
    } else if (this.datos.estado === 'I') {
      alert("Seleccione un estado del pedido valido")
    } else if (this.datos.fechaPedido === '' || this.datos.horaPedido === '' || this.datos.ciudad === '' || this.datos.direccion === '') {
      alert("Complete todos los campos")
    } else {
      id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
      detallePedido = this.datos; //Se le pasa una variable detalle del pedido que se le asignan los nuevos datos
      this.detallePedidoService.updateDetallePedido(id, detallePedido).subscribe((response) => {
      }, (error) => {
        if (error.status === 200) { // Si el estado de la respuesta es 200 entonces se actualizo exitosamente
          alert('actualizado exitosamente');
          this.redireccionarDetallePedido();
        }
      })

    }

  }


  //Método para redireccionar a la ruta indicada
  redireccionarDetallePedido() {
    this.route.navigate(['/detallePedido'])
  }

}
