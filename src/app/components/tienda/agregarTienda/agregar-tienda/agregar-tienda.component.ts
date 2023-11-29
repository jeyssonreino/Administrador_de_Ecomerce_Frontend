import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-agregar-tienda',
  templateUrl: './agregar-tienda.component.html',
  styleUrls: ['./agregar-tienda.component.css']
})
export class AgregarTiendaComponent {

  FormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl,
    representante: new FormControl,
    telefono: new FormControl,
    estadoSuscripcion: new FormControl
  })

  constructor(private route: Router, private tiendaService: TiendaService) { }


  //Método para agregar una nueva categoria pasandole los datos 
  agregarTienda() {
    let datosFormlulario = this.FormGroup.value;
    this.tiendaService.saveTienda(datosFormlulario).subscribe((response) => {
    }, (error) => {
      if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
        alert("Categoria guardada con exito")
        this.redireccionarTienda();
      } else {
        alert('Error inesperado: ')
        console.log(error)
      }
    }
    )
  }

  //Método para redireccionar a la ruta indicada
  redireccionarTienda() {
    this.route.navigate(['/tienda'])
  }

}
