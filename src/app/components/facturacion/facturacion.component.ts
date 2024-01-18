import { Component, OnInit } from '@angular/core';
import { DetallePedidoService } from 'src/app/services/detallePedido/detalle-pedido.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  pedido:any = [];
  productos:any = [];
  total:any = "";


  constructor(private detallePedidoService: DetallePedidoService, private route: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.obtenerDetallesDelPedido(this.id);
    this.obtenerProductosDelPedido(this.id);
    this.obtenerTotalDelPedido(this.id);
  }
//Método que consume el servicio para obtener detalles del pedido con interseccion de tablas mediante su Id
  obtenerDetallesDelPedido(id:any){
    this.detallePedidoService.getDetalleDelPedidoByIdWithFk(id).subscribe((response) =>{
      this.pedido = response;
      console.log(this.pedido); //Borrar
    },(error)=>{
      if(error.status === 200){
        alert("No tiene permisos");
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
      }if (error.status === 404){
        alert('No se encontraron resultados');
      }else{
        alert('Error ineperado');
      }
    });
  }
//Método que consume el servicio para obtener los productos de un pedido en especifico mediante el Id de un detalle del pedido
  obtenerProductosDelPedido(id:any){
    this.detallePedidoService.getProductosDelPedidoById(id).subscribe((response) =>{
      this.productos = response;
      console.log(this.productos); //Borrar
    },(error)=>{
      if(error.status === 200){
        alert("No tiene permisos");
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
      }if (error.status === 404){
        alert('No se encontraron resultados');
      }else{
        alert('Error ineperado');
      }
    });
  }


  //Método que consume un servicio para obtener el precio total a pagar de un detalle del pedido mediante su id
  obtenerTotalDelPedido(id:any){
    this.detallePedidoService.getTotalDelPedido(id).subscribe((response) =>{
      this.total = response;
      console.log(this.total); //Borrar
    },(error)=>{
      if(error.status === 200){
        alert("No tiene permisos");
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
      }if (error.status === 404){
        alert('No se encontraron resultados');
      }else{
        alert('Error ineperado');
      }
    });
  }













}
