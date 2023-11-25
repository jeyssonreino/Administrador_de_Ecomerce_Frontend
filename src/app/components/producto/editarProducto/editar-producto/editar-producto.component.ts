import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { TiendaService } from 'src/app/services/tienda/tienda.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  id: string = ''; // Varriable Id para guardar el parametro ID de la URL
  producto: any;
  categorias: any;
  tiendas: any;

  //Objeto nuevo que reemplezar y actualizara al objeto registrado en la base de datos 
  datos: any = {
    id: '',
    nombre: '',
    descripcion: '',
    cantidad: 1,
    precio: 0,
    genero: 'I',
    talla: 'I',
    tipoMaterial: '',
    descuento: 0,
    marca: '',
    imagenPrincipal: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    imagen5: '',
    idCategoria: "0",
    idTienda: "0"
  };


  constructor(private route: Router, private activateRoute: ActivatedRoute, private productoService: ProductoService,private categoriaService: CategoriaService, private tiendaService: TiendaService) {
    this.producto = {};
    this.categorias = [];
    this.tiendas = [];
    this.obtenerCategorias();
    this.obtenerTiendas();

  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.obtenerProductoPorId(this.id);

  }

  //Método para obtener un producto mediante su Id 
  obtenerProductoPorId(id: string) {
    id = this.id;
    this.productoService.getProductoById(id).subscribe((response) => {
      this.datos = response;
      console.log(this.datos);
    })
  }


  //Método para actualizar un producto pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarProductoPorId(id: string, categoria: any) {
    id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
    categoria = this.datos; //Se le pasa una variable categoria que se le asignan los nuevos datos
    this.productoService.updateProducto(id, categoria).subscribe((response) => {
    }, (error) => {
      if (error.status === 200) { // Si el estado de la respuesta es 200 entonces se actualizo exitosamente
        alert('actualizado exitosamente');
        this.redireccionarProducto();
      }
    })
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
