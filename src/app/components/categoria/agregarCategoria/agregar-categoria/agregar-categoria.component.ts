import { Component, NgModule } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent {

//Objeto de datos de la entidad 
  datos: any = {
    id: '',
    nombre: ''
  };

  constructor(private route: Router,private categoriaService: CategoriaService) { }


  //Método para agregar una nueva categoria pasandole los datos 
  agregarCategoria() {
    this.categoriaService.saveCategoria(this.datos).subscribe((response) => {
    }, (error) => {
      if (error.status === 201) {//Si la respuesta es 201 significa que fue creada exitosamente y se guardo en la base de datos 
        alert("Categoria guardada con exito")
        this.redireccionarCategoria(); 
      }else{
        alert('Error inesperado: ')
      }
    }
    )
  }

  //Método para redireccionar a la ruta indicada
  redireccionarCategoria(){
    this.route.navigate(['/categoria'])
  }

}
