import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //Método para llamar al servicio de loguear y crear un Token unico de acceso
  loguearUsuario(datos: any) {
    const url = this.api + "/login";
    return this.http.post(url, datos, { observe: 'response' }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')! //Se obtiene el valor de Authorization del header (el token)
      const token = bearerToken;
      const id = body.id;
      const correo = body.correo
      localStorage.setItem('token', token) //Se crea un token unico en LocalStored
      localStorage.setItem('idUser',id) //Se almacena el id del usuario en LocalStored
      localStorage.setItem('email', correo) //Se almacena el email del usuario en LocalStored
      return body;
    }));
  }

  //Método para obtener un Token creado del LocalStored
  obtenerToken() {
    return localStorage.getItem('token');
  }
  //Método para obtener el id del usuario  del LocalStored
  obtenerIdUsuario(){
    return localStorage.getItem('idUser');
  }
  //Método para obtener el correo del usuario  del LocalStored
  obtenerEmailUsuario(){
    return localStorage.getItem('email');
  }

  //Método para eliminar un Token creado del LocalStored
  eliminarToken() {
    localStorage.removeItem('token')
  }
  //Método para eliminar el id del usuario  del LocalStored
  eliminarIdUsuario(){
    localStorage.removeItem('idUser');
  }
  //Método para eliminar el correo del usuario  del LocalStored
  eliminarEmailUsuario(){
    localStorage.removeItem('email');
  }

//Prueba en home, esto se tiene que liminar de aqui 
  getDetallePedidos(){
    const url = this.api + "/obtener-categorias";
    return this.http.get(url);
  }




















}
