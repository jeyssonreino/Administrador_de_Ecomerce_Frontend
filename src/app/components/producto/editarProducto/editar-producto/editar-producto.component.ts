import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { FormControl, FormGroup } from '@angular/forms';

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
    idCategoria: new FormControl("0"),
    idTienda: new FormControl("0")  
  })


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
    this.productoService.getProductoById(id).subscribe((response:any) => {
      this.FormGroup.setValue({
        id: response.id,
        nombre: response.nombre,
        descripcion: response.descripcion ,
        cantidad: response.cantidad,
        precio: response.precio,
        genero: response.genero,
        talla: response.talla,
        tipoMaterial: response.tipoMaterial,
        descuento: response.descuento,
        marca: response.marca,
        imagenPrincipal: response.imagenPrincipal,
        imagen2: response.imagen2,
        imagen3: response.imagen3,
        imagen4: response.imagen4,
        imagen5: response.imagen5,
        idCategoria: response.idCategoria,
        idTienda: response.idTienda
      })
      console.log(this.FormGroup.value)
    })
  }


  //Método para actualizar un producto pasandole el Id de la que se quiere actualizar y los nuevos datos que seran actualizados
  actualizarProductoPorId(id: string, categoria: any) {
    id = this.id; // Se le pasa el Id de la URL que ya estaba guardada en la variable this.id
    categoria = this.FormGroup.value; //Se le pasa una variable categoria que se le asignan los nuevos datos
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
