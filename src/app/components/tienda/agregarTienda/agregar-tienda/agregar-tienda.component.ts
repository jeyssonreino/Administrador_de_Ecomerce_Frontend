import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tienda',
  templateUrl: './agregar-tienda.component.html',
  styleUrls: ['./agregar-tienda.component.css']
})
export class AgregarTiendaComponent {

  //Objeto de datos de la entidad 
  datos: any = {
    id: '',
    nombre: '',
    representante: '',
    telefono: '',
    estadoSuscripcion: ''
  };

  constructor(private route: Router, private tiendaService: TiendaService) { }


  //Método para agregar una nueva categoria pasandole los datos 
  agregarTienda() {
    this.tiendaService.saveTienda(this.datos).subscribe((response) => {
    }, (error) => {
      if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
        alert("Categoria guardada con exito")
        this.redireccionarTienda();
      } else {
        alert('Error inesperado: ')
      }
    }
    )
  }

  //Método para redireccionar a la ruta indicada
  redireccionarTienda() {
    this.route.navigate(['/tienda'])
  }

}
