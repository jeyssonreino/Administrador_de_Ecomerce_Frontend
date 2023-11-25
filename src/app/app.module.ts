import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms'; 
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AuthInterceptor } from './helpers/auth.interceptor';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CategoriaComponent,
    AgregarCategoriaComponent,
    EditarCategoriaComponent,
    TiendaComponent,
    AgregarTiendaComponent,
    EditarTiendaComponent,
    ProductoComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    UsuarioComponent,
    AgergarUsuarioComponent,
    EditarUsuarioComponent,
    DetallePedidoComponent,
    AgregarDetallePedidoComponent,
    EditarDetallePedidoComponent,
    PedidoComponent,
    AgregarPedidoComponent,
    EditarPedidoComponent,
    DashboardComponent,

    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
