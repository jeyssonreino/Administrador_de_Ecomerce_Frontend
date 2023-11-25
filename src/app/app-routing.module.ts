import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AgregarCategoriaComponent } from './components/categoria/agregarCategoria/agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './components/categoria/editarCategoria/editar-categoria/editar-categoria.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { AgregarTiendaComponent } from './components/tienda/agregarTienda/agregar-tienda/agregar-tienda.component';
import { EditarTiendaComponent } from './components/tienda/editarTienda/editar-tienda/editar-tienda.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AgregarProductoComponent } from './components/producto/agregarProducto/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './components/producto/editarProducto/editar-producto/editar-producto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AgergarUsuarioComponent } from './components/usuario/agregarUsuario/agergar-usuario/agergar-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editarUsuario/editar-usuario/editar-usuario.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { AgregarDetallePedidoComponent } from './components/detalle-pedido/agregar-detalle-pedido/agregar-detalle-pedido.component';
import { EditarDetallePedidoComponent } from './components/detalle-pedido/editar-detalle-pedido/editar-detalle-pedido.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { AgregarPedidoComponent } from './components/pedido/agregar-pedido/agregar-pedido.component';
import { EditarPedidoComponent } from './components/pedido/editar-pedido/editar-pedido.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'agregarCategoria',
    component: AgregarCategoriaComponent
  },
  {
    path: 'editarCategoria/:id',
    component: EditarCategoriaComponent
  },
  {
    path: 'tienda',
    component: TiendaComponent
  },
  {
    path: 'agregarTienda',
    component: AgregarTiendaComponent
  },
  {
    path: 'editarTienda/:id',
    component: EditarTiendaComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'agregarProducto',
    component: AgregarProductoComponent
  },
  {
    path: 'editarProducto/:id',
    component: EditarProductoComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'agregarUsuario',
    component: AgergarUsuarioComponent
  },
  {
    path: 'editarUsuario/:id',
    component: EditarUsuarioComponent
  },
  {
    path: 'detallePedido',
    component: DetallePedidoComponent
  },
  {
    path: 'agregarDetallePedido',
    component: AgregarDetallePedidoComponent
  },
  {
    path: 'editarDetallePedido/:id',
    component: EditarDetallePedidoComponent
  },
  {
    path: 'pedido',
    component: PedidoComponent
  },
  {
    path: 'agregarPedido',
    component: AgregarPedidoComponent
  },
  {
    path: 'editarPedido/:id',
    component: EditarPedidoComponent
  },
  {
    path: 'administrador',
    component: DashboardComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
