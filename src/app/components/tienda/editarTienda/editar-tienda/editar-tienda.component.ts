import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.component.html',
  styleUrls: ['./editar-tienda.component.css']
})
export class EditarTiendaComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  tienda: any;

  FormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl,
    representante: new FormControl,
    telefono: new FormControl,
    estadoSuscripcion: new FormControl
  })

  constructor(private route: Router, private activateRoute: ActivatedRoute, private tiendaService: TiendaService) {
    this.tienda = {}
  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      this.id = params['id'];
    })
    this.obtenerTiendaPorId(this.id);
  }

  

  //Método para obtener una tienda mediante su Id 
  obtenerTiendaPorId(id: string) {
    id = this.id;
    this.tiendaService.getTiendaById(id).subscribe((response:any) => {
      this.FormGroup.setValue({
        id: response.id,
        nombre: response.nombre,
        representante: response.representante,
        telefono: response.telefono,
        estadoSuscripcion: response.estadoSuscripcion
      })
    })
  }

  //Método para actualizar una tienda pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarTiendaPorId(id: string, tienda: any) {
    id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
    tienda = this.FormGroup.value; //Se le pasa una variable categoria que se le asignan los nuevos datos
    this.tiendaService.updateTienda(id, tienda).subscribe((response) => {
    }, (error) => {
      if (error.status === 200) { // Si el estado de la respuesta es 200 entonces se actualizo exitosamente
        alert('actualizado exitosamente');
        this.redireccionarTienda();
      }
    })
  }

  //Método para redireccionar a la ruta indicada
  redireccionarTienda() {
    this.route.navigate(['/tienda'])
  }

}
