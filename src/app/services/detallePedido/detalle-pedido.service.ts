import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

    //Servicio para obtener todas los detalle del pedido registrados en la base de datos
    getDetallePedido(){
      const url = this.api + "/obtener-detallepedidos";
      return this.http.get(url);
    }
    //Servicio para eliminar un detalle de un pedido por su Id
    deleteDetallePedido(id: number){
      const url = this.api + `/eliminar-detallepedido/${id}`;
      return this.http.delete(url)
    }
    //Servicio para obtener una detalle pedido por su Id
    getDetallePedidoById(id:string){
      const url = this.api + `/obtener-detallepedido/${id}`;
      return this.http.get(url);
    }
    //Servicio para actualizar un detalle del pedido pasandole el Id y los nuevos datos
    updateDetallePedido(id:string, datos:any){
      const url = this.api + `/actualizar-detallepedido/${id}`;
      return this.http.put(url,datos);
    }
    //Servicio para registrar una detalle del pedido pasandole los datos
    saveDetallePedido(datos:any){
      const url = this.api + `/registrar-detallepedido`;
      return this.http.post(url,datos);
    }

    //Servicio para obtener el detalle del pedido con interseccion de tablas por el Id del detalle del pedido
    getDetalleDelPedidoByIdWithFk(id:number){
      const url = this.api + `/obtenerDetallePedidoPorId/${id}`;
      return this.http.get(url);
    }
    //Servicio para obtener todos los productos del pedido en especifico por Id del detalle del pedido
    getProductosDelPedidoById(id:number){
      const url = this.api + `/obtenerProductosDelPedidoPorId/${id}`;
      return this.http.get(url);
    }
    //Servicio para obtener el total a pagar del pedido en especifico por Id del detalle del pedido
    getTotalDelPedido(id:number){
      const url = this.api + `/obtenerTotalDelDetalleDelPedido/${id}`;
      return this.http.get(url);
    }
}
