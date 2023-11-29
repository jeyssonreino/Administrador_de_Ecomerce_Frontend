import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{

  id:string = ''; // Varriable Id para guardar el parametro ID de la URL
  categoria:any; 


  FormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl,
  })

  constructor(private route: Router,private activateRoute: ActivatedRoute, private categoriaService: CategoriaService ){
    this.categoria = {};

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      this.id = params['id'];
    })
    this.obtenerCategoriaPorId(this.id);
  }
//Método para obtener una categoria mediante su Id 
  obtenerCategoriaPorId(id:string){
    id = this.id;
    this.categoriaService.getCategoriaById(id).subscribe((response:any) =>{
      this.FormGroup.setValue({
        id: response.id,
        nombre: response.nombre,

      })
    })
  }

  //Método para actualizar una categoria pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarCategoriaPorId(id:string, categoria:any){
    id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
    categoria = this.FormGroup.value; //Se le pasa una variable categoria que se le asignan los nuevos datos
    this.categoriaService.updateCategoria(id,categoria).subscribe((response) => {
    },(error) => {
      if(error.status === 200){ // Si el estado de la respuesta es 200 entonces se actualizo exitosamente
        alert('actualizado exitosamente');
        this.redireccionarCategoria();
      }
    })
  }

  //Método para redireccionar a la ruta indicada
  redireccionarCategoria(){
    this.route.navigate(['/categoria'])
  }


  

  

}
