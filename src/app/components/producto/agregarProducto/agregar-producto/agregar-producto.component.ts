import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  FormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl,
    descripcion: new FormControl ,
    cantidad: new FormControl(1),
    precio: new FormControl(0),
    genero: new FormControl('I'),
    talla: new FormControl('I'),
    tipoMaterial: new FormControl,
    descuento: new FormControl(0),
    marca: new FormControl,
    imagenPrincipal: new FormControl,
    imagen2: new FormControl,
    imagen3: new FormControl,
    imagen4: new FormControl,
    imagen5: new FormControl,
    idCategoria: new FormControl('0'),
    idTienda: new FormControl('0')
  })

  categorias: any;
  tiendas: any;


  constructor(private productoService: ProductoService, private route: Router, private categoriaService: CategoriaService, private tiendaService: TiendaService) {
    this.categorias = [];
    this.tiendas = [];
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerTiendas();
  }


  //Método para agregar un nuevo producto pasandole los datos 
  agregarProducto() {
    let datosFormlulario = this.FormGroup.value;
    if(datosFormlulario.idCategoria === "0"){
      alert("Escoja una categoria valida para el producto que quiere agregar")
    }else if (datosFormlulario.idTienda === "0"){
      alert("Escoja una tienda valida para el producto que quiere agregar")
    }else{
      this.productoService.saveProducto(datosFormlulario).subscribe((response) => {
      }, (error) => {
        if (error.status === 201) {//Si la respuesta es 201 significa que fue creado exitosamente y se guardo en la base de datos 
          alert("Categoria guardada con exito")
          this.redireccionarProducto();
        } else {
          alert('Error inesperado: ')
        }
      }
      )
    }

  }

  //Método para redireccionar a la ruta indicada
  redireccionarProducto() {
    this.route.navigate(['/producto'])
  }

  //Método para obtener las categoria para mostrar una lista de categorias que se pueden elegir
  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((response) => {    //Se llama al servicio para obtener las categorias
      this.categorias = response;
    }, (error) => {
      if (error.status === 403) { //Se valida que que el usuario tenga los permisos necesarios
        alert('No tienes permisos');
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
      } else if (error.status === 404) {//Se valida que haya categorias registradas en la base de datos 
        alert('No se encontraron resultados');
      } else {
        alert('Error inesperado');
        console.log(error)
      }
    });
  }

  //Método para obtenr las tiendas para mostrar una lista de tiendas que se pueden elegir
  obtenerTiendas() {
    this.tiendaService.getTiendas().subscribe((response) => {    //Se llama al servicio para obtener las tiendas
      this.tiendas = response;
    }, (error) => {
      if (error.status === 403) { //Se valida que que el usuario tenga los permisos necesarios
        alert('No tienes permisos');
        this.route.navigate(['/login']); //Si no tiene los permisos necesarios se redirecciona al login
      } else if (error.status === 404) {//Se valida que haya tiendas registradas en la base de datos 
        alert('No se encontraron resultados');
      } else {
        alert('Error inesperado');
        console.log(error)
      }
    });
  }

}
