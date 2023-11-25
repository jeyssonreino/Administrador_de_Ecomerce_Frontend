import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

    //Servicio para obtener todas las usuarios registradas en la base de datos
    getUsuarios(){
      const url = this.api + "/obtener-usuarios";
      return this.http.get(url);
    }
    //Servicio para eliminar una usuario por su Id
    deleteUsuario(id: number){
      const url = this.api + `/eliminar-usuario/${id}`;
      return this.http.delete(url)
    }
    //Servicio para obtener una usuario por su Id
    getUsuarioById(id:string){
      const url = this.api + `/obtener-usuario/${id}`;
      return this.http.get(url);
    }
    //Servicio para actualizar un usuario pasandole el Id y los nuevos datos
    updateUsuario(id:string, datos:any){
      const url = this.api + `/actualizar-usuario/${id}`;
      return this.http.put(url,datos);
    }
    //Servicio para registrar una usuario pasandole los datos
    saveUsuario(datos:any){
      const url = this.api + `/registrar-usuario`;
      return this.http.post(url,datos);
    }



}
