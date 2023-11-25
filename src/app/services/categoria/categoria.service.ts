import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService{

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  //Servicio para obtener todas las categorias registradas en la base de datos
  getCategorias(){
    const url = this.api + "/obtener-categorias";
    return this.http.get(url);
  }
  //Servicio para eliminar una categoria por su Id
  deleteCategoria(id: number){
    const url = this.api + `/eliminar-categoria/${id}`;
    return this.http.delete(url)
  }
  //Servicio para obtener una categoria por su Id
  getCategoriaById(id:string){
    const url = this.api + `/obtener-categoria/${id}`;
    return this.http.get(url);
  }
  //Servicio para actualizar una categoria pasandole el Id y los nuevos datos
  updateCategoria(id:string, datos:any){
    const url = this.api + `/actualizar-categoria/${id}`;
    return this.http.put(url,datos);
  }
  //Servicio para registrar una categoria pasandole los datos
  saveCategoria(datos:any){
    const url = this.api + `/registrar-categoria`;
    return this.http.post(url,datos);
  }




}
