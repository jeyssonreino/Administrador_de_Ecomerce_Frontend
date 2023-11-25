import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  //Servicio para obtener todas las tiendas registradas en la base de datos
  getTiendas(){
    const url = this.api + "/obtener-tiendas";
    return this.http.get(url);
  }
  //Servicio para eliminar una teinda por su Id
  deleteTienda(id: number){
    const url = this.api + `/eliminar-tienda/${id}`;
    return this.http.delete(url)
  }
  //Servicio para obtener una tienda por su Id
  getTiendaById(id:string){
    const url = this.api + `/obtener-tienda/${id}`;
    return this.http.get(url);
  }
  //Servicio para actualizar una tienda pasandole el Id y los nuevos datos
  updateTienda(id:string, datos:any){
    const url = this.api + `/actualizar-tienda/${id}`;
    return this.http.put(url,datos);
  }
  //Servicio para registrar una tienda pasandole los datos
  saveTienda(datos:any){
    const url = this.api + `/registrar-tienda`;
    return this.http.post(url,datos);

  }

}
