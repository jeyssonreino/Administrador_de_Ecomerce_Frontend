import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

    //Servicio para obtener todas los pedidos registrados en la base de datos
    getPedidos(){
      const url = this.api + "/obtener-pedidos";
      return this.http.get(url);
    }
    //Servicio para eliminar una pedido por su Id
    deletePedido(id: number){
      const url = this.api + `/eliminar-pedido/${id}`;
      return this.http.delete(url)
    }
    //Servicio para obtener una pedido por su Id
    getPedidoById(id:string){
      const url = this.api + `/obtener-pedido/${id}`;
      return this.http.get(url);
    }
    //Servicio para actualizar una pedido pasandole el Id y los nuevos datos
    updatePedido(id:string, datos:any){
      const url = this.api + `/actualizar-pedido/${id}`;
      return this.http.put(url,datos);
    }
    //Servicio para registrar un pedido pasandole los datos
    savePedido(datos:any){
      const url = this.api + `/registrar-pedido`;
      return this.http.post(url,datos);
    }
}
