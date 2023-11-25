import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //Servicio para obtener todas los productos registrados en la base de datos
  getProductos() {
    const url = this.api + "/obtener-productos";
    return this.http.get(url);
  }
  //Servicio para eliminar un producto por su Id
  deleteProducto(id: number) {
    const url = this.api + `/eliminar-producto/${id}`;
    return this.http.delete(url)
  }
  //Servicio para obtener un producto por su Id
  getProductoById(id: string) {
    const url = this.api + `/obtener-producto/${id}`;
    return this.http.get(url);
  }
  //Servicio para actualizar un producto pasandole el Id y los nuevos datos
  updateProducto(id: string, datos: any) {
    const url = this.api + `/actualizar-producto/${id}`;
    return this.http.put(url, datos);
  }
  //Servicio para registrar una categoria pasandole los datos
  saveProducto(datos: any) {
    const url = this.api + `/registrar-producto`;
    return this.http.post(url, datos);

  }

  //Servicio para obtener todos los productos registrados en la base de datos con sus respectivos nombres en las Foreing Keys
  getProductosWithFk() {
    const url = this.api + "/obtener-productosfk";
    return this.http.get(url);
  }

}
