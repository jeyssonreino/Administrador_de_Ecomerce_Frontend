import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedidoService } from 'src/app/services/detallePedido/detalle-pedido.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-detalle-pedido',
  templateUrl: './agregar-detalle-pedido.component.html',
  styleUrls: ['./agregar-detalle-pedido.component.css']
})
export class AgregarDetallePedidoComponent {

  
  FormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    fechaPedido: new FormControl(null),
    horaPedido: new FormControl(null),
    formaPago: new FormControl('I'),
    ciudad:new FormControl,
    direccion: new FormControl,
    estado: new FormControl('I')
  })


  constructor(private route:Router, private detallePedidoService: DetallePedidoService ){}

    //Método para agregar un nuevo detalle del pedido pasandole los datos 
    agregarDetallePedido() {
      let datosFormlulario = this.FormGroup.value;
      if(datosFormlulario.formaPago === 'I'){
        alert("Seleccione una forma de pago del pedido valido")
      }else if(datosFormlulario.estado === 'I'){
        alert("Seleccione un estado del pedido valido")
      }else if(datosFormlulario.fechaPedido === '' || datosFormlulario.horaPedido === '' || datosFormlulario.ciudad === '' || datosFormlulario.direccion === ''){
        alert("Complete todos los campos")
      }else{
        this.detallePedidoService.saveDetallePedido(datosFormlulario).subscribe((response) => {
        }, (error) => {
          if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
            alert("Detalles del pedido guardado con exito")
            this.redireccionarDetallePedido(); 
          }else{
            alert('Error inesperado: ')
            console.log(error);
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
