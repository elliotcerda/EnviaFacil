import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { InicioSesionComponent} from './inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesDetallesComponent} from './clientes-detalles/clientes-detalles.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosDetallesComponent } from './productos-detalles/productos-detalles.component';

const routes: Routes =[
	{path:'Inicio', 		component:InicioComponent},
	{path:'InicioSesion', 	component:InicioSesionComponent},
	{path:'Clientes', 		component:ClientesComponent},
	{path:'NuevoCliente', 	component:ClientesDetallesComponent},
	{path:'clienteDetalles/:id', 	component:ClientesDetallesComponent},
	{path:'Productos', 				component:ProductosComponent},
	{path:'NuevoProducto', 				component:ProductosDetallesComponent},
	{path:'productoDetalles/:id', 	component:ProductosDetallesComponent},
	{path:'', 				redirectTo:'/Inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }
