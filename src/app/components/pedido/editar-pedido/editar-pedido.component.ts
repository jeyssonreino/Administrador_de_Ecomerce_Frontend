import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  pedido: any;


  //Objeto nuevo que reemplezar y actualizara al objeto registrado en la base de datos 
  datos: any = {
    id: '',
    nombre: ''
  };

  constructor(private route: Router, private activateRoute: ActivatedRoute, private pedidoService: PedidoService) {
    this.pedido = {};
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.obtenerCategoriaPorId(this.id);

  }

  //Método para obtener un pedido mediante su Id 
  obtenerCategoriaPorId(id: string) {
    id = this.id;
    this.pedidoService.getPedidoById(id).subscribe((response) => {
      this.datos = response;
    })
  }

  //Método para actualizar un pedido pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarPedidoPorId(id: string, pedido: any) {
    if (this.datos.idProducto === '' || this.datos.idUsuario === '') {
      alert("Complete todos los campos")
    } else {
      id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
      pedido = this.datos; //Se le pasa una variable pedido que se le asignan los nuevos datos
      this.pedidoService.updatePedido(id, pedido).subscribe((response) => {
      }, (error) => {
        if (error.status === 200) { // Si el estado de la respuesta es 200 entonces se actualizo exitosamente
          alert('actualizado exitosamente');
          this.redireccionarPedido();
        }
      })

    }

  }

  //Método para redireccionar a la ruta indicada
  redireccionarPedido() {
    this.route.navigate(['/pedido'])
  }

}
